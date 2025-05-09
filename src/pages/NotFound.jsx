// src/pages/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>صفحه مورد نظر پیدا نشد!</h1>
      <p style={styles.message}>
        متاسفانه صفحه‌ای که دنبال آن بودید وجود ندارد.
      </p>
      <Link to="/" style={styles.link}>
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  title: {
    fontSize: "36px",
    color: "#e74c3c",
  },
  message: {
    fontSize: "18px",
    color: "#7f8c8d",
  },
  link: {
    fontSize: "20px",
    color: "#3498db",
    textDecoration: "none",
  },
};

export default NotFound;
