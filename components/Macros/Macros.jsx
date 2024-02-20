function Macros({ macros }) {
  const myMacros = macros;
  return (
    <div>
      <select>
        {myMacros.map((macro, index) => (
          <option key={index}>{macro.macroName}</option>
        ))}
      </select>
    </div>
  );
}
export default Macros;
