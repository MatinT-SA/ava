const BASE_URL = "https://harf.roshan-ai.ir/api";
const TOKEN = "a85d08400c622b50b18b61e239b9903645297196";

// fetching the transcript data from the API
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

// Fetching details of a specific archive item
export async function fetchArchiveItemDetails(id) {
  const response = await fetch(`${BASE_URL}/requests/${id}/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`خطا در دریافت جزئیات آرشیو: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Deleting archive item
export async function deleteArchiveItem(id) {
  const res = await fetch(`${BASE_URL}/requests/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`خطا در حذف فایل با شناسه ${id}`);
  }

  return true;
}
