function Libraries({ library }) {
  const myLibraries = library;
  return (
    <div>
      <select>
        {myLibraries.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  );
}
export default Libraries;
