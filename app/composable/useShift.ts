import { computed } from "vue";
import { useFetch } from "#app";
import { type Response } from "~/types/github";

export const useShift = async () => {
  // ✅ fetch once (SSR safe)
  const { data: response } = await useFetch("/api/user-json", {
    key: "user-list",
  });

  const users = computed(() => response.value?.data || {});

  // ✅ day of year
  const dayOfYear = computed(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff =
      today.getTime() -
      start.getTime() +
      (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;

    return Math.floor(diff / (1000 * 60 * 60 * 24));
  });

  const whatDay = computed(() => dayOfYear.value % 6);

  const awal = computed(() => users.value[0]?.mulai ?? -1);
  const isAwalOdd = computed(() => awal.value % 2 !== 0);

  const shiftMaps = computed(() =>
    isAwalOdd.value
      ? {
          pagi: [
            [3, 4],
            [1, 2],
            [1, 2],
            [5, 0],
            [5, 0],
            [3, 4],
          ],
          malam: [
            [5, 0],
            [3, 4],
            [3, 4],
            [1, 2],
            [1, 2],
            [5, 0],
          ],
          libur: [
            [1, 2],
            [5, 0],
            [5, 0],
            [3, 4],
            [3, 4],
            [1, 2],
          ],
        }
      : {
          pagi: [
            [1, 2],
            [1, 2],
            [5, 0],
            [5, 0],
            [3, 4],
            [3, 4],
          ],
          malam: [
            [3, 4],
            [3, 4],
            [1, 2],
            [1, 2],
            [5, 0],
            [5, 0],
          ],
          libur: [
            [5, 0],
            [5, 0],
            [3, 4],
            [3, 4],
            [1, 2],
            [1, 2],
          ],
        },
  );

  const pagi = computed(() => shiftMaps.value.pagi[whatDay.value]);
  const malam = computed(() => shiftMaps.value.malam[whatDay.value]);
  const libur = computed(() => shiftMaps.value.libur[whatDay.value]);

  // ✅ core filter
  const filterUsersByMulai = (indexes: number[]) =>
    Object.entries(users.value)
      .filter(([_, user]: any) => indexes.includes(user.mulai))
      .map(([id, user]: any) => ({
        ...user,
        id,
      }));

  // ✅ shifts
  const groupPagi = computed(() => filterUsersByMulai(pagi.value));
  const groupMalam = computed(() => filterUsersByMulai(malam.value));
  const groupLibur = computed(() => filterUsersByMulai(libur.value));

  // ✅ admin (if still exists)
  const admin = computed(() =>
    Object.entries(users.value)
      .filter(([_, u]: any) => u.mulai === 6)
      .map(([id, u]: any) => ({ ...u, id })),
  );

  const isEvenDay = computed(() => whatDay.value % 2 === 0);

  const shift2a = computed(() =>
    isAwalOdd.value
      ? !isEvenDay.value
        ? groupMalam.value
        : []
      : isEvenDay.value
        ? groupMalam.value
        : [],
  );

  const shift2b = computed(() =>
    isAwalOdd.value
      ? isEvenDay.value
        ? groupMalam.value
        : []
      : !isEvenDay.value
        ? groupMalam.value
        : [],
  );

  const libur1 = computed(() =>
    isAwalOdd.value
      ? !isEvenDay.value
        ? groupLibur.value
        : []
      : isEvenDay.value
        ? groupLibur.value
        : [],
  );

  const libur2 = computed(() =>
    isAwalOdd.value
      ? isEvenDay.value
        ? groupLibur.value
        : []
      : !isEvenDay.value
        ? groupLibur.value
        : [],
  );

  return {
    shift1: groupPagi,
    shift2a,
    shift2b,
    libur1,
    libur2,
    admin,
  };
};
