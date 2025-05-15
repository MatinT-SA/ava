const BASE_URL = "https://harf.roshan-ai.ir/api";
const TOKEN = "a85d08400c622b50b18b61e239b9903645297196";

export async function fetchArchiveItems() {
  const response = await fetch(`${BASE_URL}/requests/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`خطا در دریافت آرشیو: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
