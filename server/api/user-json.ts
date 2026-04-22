export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = config.githubToken;

  const owner = "OgySatya";
  const repo = "Seloaji";
  const path = "data/users.json";

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const method = event.node.req.method;

  // 🔧 helper → get latest file
  const getFile = async () => {
    const file: any = await $fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    const base64 = file.content.replace(/\n/g, "");

    const data = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));

    return { sha: file.sha, data };
  };

  // 🔧 helper → push update
  const updateFile = async (newData: any, sha: string, message: string) => {
    const content = Buffer.from(JSON.stringify(newData, null, 2)).toString(
      "base64",
    );

    return await $fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      body: {
        message,
        content,
        sha,
      },
    });
  };

  // =========================
  // 📥 GET → READ USERS
  // =========================
  if (method === "GET") {
    const { data, sha } = await getFile();
    return { data, sha };
  }

  const body = await readBody(event);

  // =========================
  // ➕ CREATE USER
  // =========================
  if (method === "POST") {
    const { data, sha } = await getFile();

    const newUser = {
      id: Date.now(), // simple unique id
      ...body,
    };

    const updated = [...data, newUser];

    await updateFile(updated, sha, "create user");

    return {
      success: true,
      user: newUser,
    };
  }

  // =========================
  // ✏️ UPDATE USER
  // =========================
  if (method === "PUT") {
    const { data, sha } = await getFile();
    const body = await readBody(event);

    // 1. find user index
    const index = data.findIndex((user: any) => user.nip === body.nip);

    // 3. update ONLY that user
    data[index] = {
      ...data[index],
      status: body.status,
    };

    // 4. save back to GitHub
    await updateFile(data, sha, "update user status by nip");

    return {
      success: true,
      user: data[index],
    };
  }
  // =========================
  // 🔄 PATCH → RESET ALL USERS STATUS
  // =========================
  if (method === "PATCH") {
    const { data, sha } = await getFile();

    if (body.action === "tiarap") {
      const updated = data.map((user: any) => ({
        ...user,
        status: false,
      }));

      await updateFile(updated, sha, "reset all user status to false");

      return {
        success: true,
        count: updated.length,
      };
    }
  }

  if (method === "PATCH") {
    const body = await readBody(event);
    const { data, sha } = await getFile();

    // ✅ batch update
    if (body.action === "batch-update-mulai") {
      const updated = data.map((user: any) => {
        const match = body.updates.find((u: any) => u.group === user.group);

        if (match) {
          return {
            ...user,
            mulai: match.mulai,
          };
        }

        return user;
      });

      await updateFile(updated, sha, "batch update mulai");

      return {
        success: true,
        updated: body.updates.length,
      };
    }
  }

  // =========================
  // ❌ DELETE USER
  // =========================
  if (method === "DELETE") {
    const { data, sha } = await getFile();

    const updated = data.filter((user: any) => user.nip !== body.nip);

    await updateFile(updated, sha, "delete user");

    return { success: true };
  }

  // =========================
  // ❌ INVALID METHOD
  // =========================
  throw createError({
    statusCode: 405,
    statusMessage: "Method Not Allowed",
  });
});
