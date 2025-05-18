// function TextWithHighlight({ text, highlight }) {
//   if (!highlight) return <span>{text}</span>;

//   const highlights = Array.isArray(highlight) ? highlight : [highlight];
//   const regex = new RegExp(`(${highlights.join("|")})`, "gi");
//   const parts = text.split(regex);

//   return (
//     <>
//       {parts.map((part, i) =>
//         highlights.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
//           <mark key={i} style={{ backgroundColor: "yellow", color: "black" }}>
//             {part}
//           </mark>
//         ) : (
//           <span key={i}>{part}</span>
//         ),
//       )}
//     </>
//   );
// }

// export default TextWithHighlight;
