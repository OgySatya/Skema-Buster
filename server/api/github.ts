export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const GITHUB_API =
    "https://api.github.com/repos/OgySatya/Skema-Buster/contents/data/users.json";
  const method = getMethod(event);

  const headers = {
    Authorization: `Bearer ${config.githubToken}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Nuxt-App",
  };

  try {
    // --- 1. GET (Read) ---
    if (method === "GET") {
      const data: any = await $fetch(GITHUB_API, { headers });

      // Decode Base64 safely
      const content = atob(data.content.replace(/\n/g, ""));

      return {
        content: JSON.parse(content),
        sha: data.sha,
      };
    }

    // --- 2. PUT (Create / Update / Delete) ---
    if (method === "PUT") {
      const body = await readBody(event);

      // Standardize the string for Base64 (Handling UTF-8 characters safely)
      const jsonString = JSON.stringify(body.data, null, 2);
      const updatedContent = btoa(unescape(encodeURIComponent(jsonString)));

      // You missed this part: Actually sending it to GitHub!
      const response: any = await $fetch(GITHUB_API, {
        method: "PUT",
        headers,
        body: {
          message: "Update via Nuxt Admin",
          content: updatedContent,
          sha: body.sha, // Must match current file SHA
        },
      });

      // Return the new SHA so the frontend can do subsequent updates
      return {
        success: true,
        content: body.data,
        sha: response.content.sha,
      };
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message || "Internal Server Error",
    });
  }
});
