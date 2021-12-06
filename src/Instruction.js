import './instruction.css';

const Instruction = () => {
  return (
    <div className='instruction'>
      <h2>Hi! There are few steps that you should do to get your stats:</h2>
      <ul className='instruction-list'>
        <li>1. Go to <a href="https://takeout.google.com/">Google Takeout</a></li>
        <li>2. Click <code>Deselect All</code> above the first checkbox.</li>
        <li>3. Scroll all the way down to YouTube, and only check that box.</li>
        <li>4. Click the button that says <code>Multiple Formats</code>.</li>
        <li>5. Next to <code>History</code>, select the <code>JSON</code> option from the dropdown box and Click OK.</li>
        <li>6. Click on the <code>All YouTube data included button</code>.</li>
        <li>7. Click <code>Deselect All</code>, and then only check <code>History</code>. Click OK.</li>
        <li>8. Scroll down and hit next step to finish your takeout.</li>
        <li>9. After you get your archive, upload the <code>watch-history.json</code> into the form below</li>
      </ul>
    </div>
  );
}

export default Instruction;