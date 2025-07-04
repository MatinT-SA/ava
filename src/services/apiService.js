const BASE_URL = "/api";
const TOKEN = "a85d08400c622b50b18b61e239b9903645297196";

// Fetching list of archive items
export async function fetchArchiveItems(page = 1) {
  const response = await fetch(`${BASE_URL}/requests/?page=${page}`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!response.ok) throw new Error("خطا در دریافت داده");
  return response.json();
}

// Fetching details of a single archive item
export async function fetchArchiveItemDetails(id) {
  const response = await fetch(`${BASE_URL}/requests/${id}/`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!response.ok)
    throw new Error(`خطا در دریافت جزئیات آرشیو با شناسه ${id}`);
  return response.json();
}

// Deleting an archive item
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

// Speech Conversion

// Link
export async function transcribeFilesFromMediaUrls(mediaUrls) {
  const res = await fetch(`${BASE_URL}/transcribe_files/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
    body: JSON.stringify({
      media_urls: mediaUrls,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("پاسخ خطا از سرور:", data);
    throw new Error(data.message || "خطا در تبدیل گفتار");
  }

  return data;
}

// Uploading file
export async function transcribeFileUpload(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/transcribe_files/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
    body: formData,
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("پاسخ خطای خام:", text);
    throw new Error("خطا در ارسال فایل صوتی: " + text.slice(0, 100));
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("پاسخ JSON نبود. محتوای دریافتی: " + text.slice(0, 100));
  }
}
