function Looks({ looks }) {
  const myLooks = looks;
  return (
    <div>
      <select>
        {myLooks.map((look, index) => (
          <option key={index}>{look.lookName}</option>
        ))}
      </select>
    </div>
  );
}
export default Looks;
