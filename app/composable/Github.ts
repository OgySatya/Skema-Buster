import { type User } from "~/types/user";
interface GithubApi {
  content: User[]; // The array of users
  sha: string; // The GitHub file SHA
}
export const useGithubJson = () => {
  const list = useState<User[]>("github-data", () => []);
  const sha = useState<string>("github-sha", () => "");
  const loading = ref(false);

  // --- PRIVATE UTILITY ---
  // We use this internal function to sync with GitHub
  const syncToGithub = async (updatedData: User[]) => {
    loading.value = true;
    try {
      const response: any = await $fetch("/api/github", {
        method: "PUT",
        body: { data: updatedData, sha: sha.value },
      });

      list.value = updatedData;
      sha.value = response.content.sha;
      return { success: true };
    } catch (err) {
      console.error("Github Sync Error:", err);
      return { success: false, error: err };
    } finally {
      loading.value = false;
    }
  };

  // --- READ ---
  const loadData = async () => {
    loading.value = true;
    try {
      // We use useFetch with our response interface
      const { data, error } = await useFetch<GithubApi>("/api/github");

      if (error.value) {
        throw new Error(error.value.statusMessage || "Failed to fetch");
      }

      if (data.value) {
        // Update the global state
        list.value = data.value.content;
        sha.value = data.value.sha;
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      loading.value = false;
    }
  };

  // --- CREATE ---
  const createUser = async (formData: Partial<User>) => {
    const newUser: User = {
      id: 0,
      name: formData.name || "New User",
      nip: formData.nip || 0,
      group: formData.group || "a",
      mulai: 0,
      password: formData.nip?.toString() || "123456",
      status: false,
    };

    return await syncToGithub([...list.value, newUser]);
  };

  // --- UPDATE ---
  const running = ref<number>(0);
  const updateUserStatus = async (id: number, newStatus: boolean) => {
    try {
      running.value = id;
      const updatedList = list.value.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user,
      );

      return await syncToGithub(updatedList);
    } finally {
      running.value = 0;
    }
  };
  const deactivateAll = async () => {
    const updatedList = list.value.map((user) => ({
      ...user,
      status: false,
    }));
    return await syncToGithub(updatedList);
  };

  // --- DELETE ---
  const deleteUser = async (id: number) => {
    const updatedList = list.value.filter((user) => user.id !== id);
    return await syncToGithub(updatedList);
  };

  return {
    running,
    list,
    loading,
    loadData,
    createUser,
    updateUserStatus,
    deactivateAll,
    deleteUser,
  };
};
