const BASE_URL = "/api";
const TOKEN = "a85d08400c622b50b18b61e239b9903645297196";

// fetching archive items
export async function fetchArchiveItems(page = 1) {
  const response = await fetch(`${BASE_URL}/requests/?page=${page}`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!response.ok) throw new Error("خطا در دریافت داده");
  return response.json();
}

// fetching the text of one item
export async function fetchTranscriptById(id) {
  const response = await fetch(`${BASE_URL}/requests/${id}/transcript/`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!response.ok) throw new Error(`خطا در دریافت متن آرشیو با شناسه ${id}`);

  return response.json();
}

// Fetching details of one item
export async function fetchArchiveItemDetails(id) {
  const response = await fetch(`${BASE_URL}/requests/${id}/`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!response.ok) throw new Error(`خطا در دریافت جزئیات آرشیو`);

  return response.json();
}

// Deleting an item
export async function deleteArchiveItem(id) {
  const res = await fetch(`${BASE_URL}/requests/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!res.ok) throw new Error(`خطا در حذف فایل با شناسه ${id}`);

  return true;
}
