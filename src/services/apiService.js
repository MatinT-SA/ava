const BASE_URL = "https://harf.roshan-ai.ir/api";
const TOKEN = "a85d08400c622b50b18b61e239b9903645297196";

// 1. Transcribe from media URL
export async function transcribeFromMediaUrl(mediaUrl) {
  const res = await fetch(`${BASE_URL}/transcribe_files/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
    body: JSON.stringify({ media_urls: [mediaUrl] }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "خطا در تبدیل گفتار");
  }

  return res.json();
}

// 2. لیست تمام درخواست‌ها (pagination optional)
export async function fetchRequestList(page = 1) {
  const res = await fetch(`${BASE_URL}/requests/?page=${page}`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("خطا در دریافت لیست درخواست‌ها");
  return res.json();
}

// 3. دریافت جزئیات یک درخواست خاص
export async function fetchRequestDetails(id) {
  const res = await fetch(`${BASE_URL}/requests/${id}/`, {
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!res.ok) throw new Error(`خطا در دریافت جزئیات درخواست ${id}`);
  return res.json();
}

// 4. حذف یک درخواست خاص
export async function deleteRequest(id) {
  const res = await fetch(`${BASE_URL}/requests/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${TOKEN}`,
    },
  });

  if (!res.ok) throw new Error(`خطا در حذف درخواست ${id}`);
  return true;
}

// 5. گرفتن تصویر از ویدیو (media image)
export async function fetchMediaImage(mediaUrl) {
  const encodedUrl = encodeURIComponent(mediaUrl);
  const fullUrl = `https://harf.roshan-ai.ir/media_image/${encodedUrl}`;

  const res = await fetch(fullUrl, {
    headers: {
      Authorization: `Token d6e0206d421c91200d2753c24892bb95d365e74c`,
    },
  });

  if (!res.ok) throw new Error("خطا در دریافت تصویر رسانه");
  return res.blob(); // یا res.url یا response.json بسته به کاربرد
}

// 6. جستجوی درون محتوای متنی
export async function searchTranscript(query) {
  const res = await fetch(`${BASE_URL}/search/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error("خطا در جستجو");
  return res.json();
}
