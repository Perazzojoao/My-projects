import Button from "./Button";

const KeyBoard = () => {
  return ( 
    <div className="grid grid-cols-4 h-full gap-3 sm:gap-4 sm:mt-4 px-4 xl:px-8">
      <Button category="action" value="AC" />
      <Button category="action" value="+/-" />
      <Button category="action" value="%" />
      <Button category="operation" value="/" />
      <Button category="numeric" value="7" />
      <Button category="numeric" value="8" />
      <Button category="numeric" value="9" />
      <Button category="operation" value="X" />
      <Button category="numeric" value="4" />
      <Button category="numeric" value="5" />
      <Button category="numeric" value="6" />
      <Button category="operation" value="-" />
      <Button category="numeric" value="1" />
      <Button category="numeric" value="2" />
      <Button category="numeric" value="3" />
      <Button category="operation" value="+" />
      <Button category="numeric" value="0" />
      <Button category="numeric" value="." />
      <Button category="operation" value="=" />
    </div>
  );
}
 
export default KeyBoard;