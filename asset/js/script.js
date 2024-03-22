function start() {

  const totalTime = 10 * 1000;
  const max16Bit = Math.pow(2, 15); // 32768 
  const maxBias = 30;


  const flyInterval = totalTime * 0.8;
  const fireInterval = totalTime * 0.1;
  const exploreInterval = totalTime * 0.1;

  // handle animation
  const body = document.body;
  body.classList.remove('fire');
  body.classList.remove('explore');
  body.classList.add('fly');

  const interval1 = setTimeout(() => {
    body.classList.add('fire');

    const interval2 = setTimeout(() => {
      body.classList.remove('fire');
      body.classList.add('explore');


      const interval3 = setTimeout(() => {
        body.classList.remove('explore');
        body.classList.add('fall');


      }, exploreInterval)
    }, fireInterval)

  }, flyInterval)



  // handle 16 bit

  const bitContainer = document.querySelector('.bit-container');
  function bitOutput(numberInput) {

    const signBit = numberInput < 0 ? 1 : 0;
    const absValue = Math.abs(numberInput);
    const binaryRepresentation = signBit + (absValue & 0x7FFF).toString(2).padStart(15, '0');
    const content = numberInput > 32767 ? "NaN" : binaryRepresentation;
    bitContainer.innerHTML = `
      <p> 
        <span class="label">${numberInput.toLocaleString()}: </span>
        <span>${content}</span>
      </p>
      ${bitContainer.innerHTML}
    `;
  }

  function reBuild16Bit() {
    bitContainer.innerHTML = ''

    let i = 0;
    while (i <= 32768) {
      bitOutput(i)
      if (i === 50) {
        bitContainer.innerHTML = `  
    ...
    ${bitContainer.innerHTML}
  `;
        i = 32550;
      } else {
        i++;
      }
    }
  }


  // handle figure

  const speed = document.querySelector('.speed');
  const bias = document.querySelector('.bias');
  const statusElem = document.querySelector('.status');

  let speedValue = 0;
  let biasValue = 0;
  const split = 100;
  const momentum = ((max16Bit) / (flyInterval / 1000 - 1)) / split;
  const biasMomen = ((maxBias) / (flyInterval / 1000 - 1)) / split;

  const speedInterval = setInterval(() => {
    speedValue += (momentum)
    biasValue += biasMomen;

    speed.innerHTML = Number(speedValue.toFixed(0)).toLocaleString();
    bias.innerHTML = Number(biasValue.toFixed(0)).toLocaleString();
    statusElem.innerHTML = speedValue > max16Bit ? "Error" : 'Normal'
    // temp 16 bit
    bitOutput(Number(speedValue.toFixed(0)))

    if (speedValue > max16Bit) {
      body.classList.add('error')
      clearInterval(speedInterval);

      reBuild16Bit()

    }

  }, 1000 / split)




}



const startButton = document.querySelector('.start')
startButton.onclick = () => {
  window.location.href = '/?start=true';
}


if (window.location.search == '?start=true') {
  start();
}