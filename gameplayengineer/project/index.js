import url from 'url';
import { createRunner, PuppeteerRunnerExtension } from '@puppeteer/replay';
import pti from 'puppeteer-to-istanbul';
import puppeteer from 'puppeteer';

import chai from 'chai' 
var expect = chai.expect;  

let temp = 19;
let positionX = 0;
let positionY = 0;
let positionZ = 0;



const browser = await puppeteer.launch({
    headless: true,
});

const page = await browser.newPage();
await page.goto('https://webaverse-alan-cousin.netlify.app/')
const f = await page.$("#highest")
const text = await (await f.getProperty('textContent')).jsonValue()
{
  const targetPage = page;
  await targetPage.keyboard.down(" ");
  console.log("space pressed")
}

{
  const targetPage = page;
  await targetPage.keyboard.down(" ");
  console.log("space pressed again")
}


class CoverageExtension extends PuppeteerRunnerExtension {

    async startCoverage() {
        // Enable both JavaScript and CSS coverage
        await Promise.all([
            page.coverage.startJSCoverage(),
            page.coverage.startCSSCoverage(),
        ]);
    }

    async stopCoverage() {
        // Disable both JavaScript and CSS coverage
        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage(),
        ]);
        let totalBytes = 0;
        let usedBytes = 0;
        const coverage = [...jsCoverage, ...cssCoverage];
        for (const entry of coverage) {
          totalBytes += entry.text.length;
          for (const range of entry.ranges) usedBytes += range.end - range.start - 1;
        }
        console.log(`Bytes used: ${(usedBytes / totalBytes) * 100}%`);
        pti.write(coverage, { includeHostname: true , storagePath: './.nyc_output' })
    }

    async beforeAllSteps(flow) {
      await super.beforeAllSteps(flow);
      await this.startCoverage();
      console.log('starting');
    }

    async beforeEachStep(step, flow) {
      await super.beforeEachStep(step, flow);
      const posX = await page.$("#positionX")
      const textX = await (await posX.getProperty('textContent')).jsonValue()
      positionX = parseFloat(textX.split(" ").pop());

      const posZ = await page.$("#positionZ")
      const textZ = await (await posZ.getProperty('textContent')).jsonValue()
      positionZ = parseFloat(textZ.split(" ").pop());

      const posY = await page.$("#current")
      const textY = await (await posY.getProperty('textContent')).jsonValue()
      positionY = parseFloat(textY.split(" ").pop());

      console.log("posx, posZ is", positionX, positionZ)

      console.log('before', step);
    }
    
    async afterEachStep(step, flow) {
      await super.afterEachStep(step, flow);    

      const posX = await page.$("#positionX")
      const textX = await (await posX.getProperty('textContent')).jsonValue()
      const positionXAfter = parseFloat(textX.split(" ").pop());

      const posZ = await page.$("#positionZ")
      const textZ = await (await posZ.getProperty('textContent')).jsonValue()
      const positionZAfter = parseFloat(textZ.split(" ").pop());

      console.log("positionXAfter, positionZAfter is", positionXAfter, positionZAfter)

      const f = await page.$("#highest")
      const text = await (await f.getProperty('textContent')).jsonValue()
      const highest = parseFloat(text.split(" ").pop());

      const posY = await page.$("#current")
      const textY = await (await posY.getProperty('textContent')).jsonValue()
      const positionYAfter = parseFloat(textY.split(" ").pop());
      
      if ((step.type == 'keyUp' || step.type == true) && (positionZAfter < positionZ)) {
        console.log("w key was succesfully inputed");
        expect(step.key).to.be.equal('w')
      }

      if ((step.type == 'keyUp' || step.type == true) && (positionZAfter > positionZ)) {
          console.log("s key was succesfully inputed");
          expect(step.key).to.be.equal('s')
      }

      if ((step.type == 'keyUp' || step.type == true) && (positionXAfter < positionX)) {
          console.log("a key was succesfully inputed");
          expect(step.key).to.be.equal('a')
      }

      if ((step.type == 'keyUp' || step.type == true) && (positionXAfter > positionX)) {
        console.log("d key was succesfully inputed");
        expect(step.key).to.be.equal('d')
      }

      if ((step.type == 'keyUp' || step.type == true) && (positionYAfter > positionY)) {
        console.log("Space key was succesfully inputed");
        expect(step.key).to.be.equal(' ')

        if ((highest - positionY) > 150) {
          console.log("Double Jump emitted!");
        }
      }

      console.log("current height is: ", highest)
      if (highest > temp) {
        await page.screenshot({ path: `./testOutputs/{${highest}}.png` });
      }      

      temp = highest; 

      console.log('after', step);

    }

    async afterAllSteps(flow) {
      await this.stopCoverage();
      await super.afterAllSteps(flow);
      console.log('Test Done.');
    }
}

export const flow = {
  "title": "Recording 9/30/2022 at 1:47:49 AM",
  "steps": [
    {
      "type": "setViewport",
      "width": 1920,
      "height": 937,
      "deviceScaleFactor": 1,
      "isMobile": false,
      "hasTouch": false,
      "isLandscape": false
    },
    {
      "type": "navigate",
      "url": "https://webaverse-alan-cousin.netlify.app/",
      "assertedEvents": [
        {
          "type": "navigation",
          "url": "https://webaverse-alan-cousin.netlify.app/",
          "title": "Jumping Test"
        }
      ]
    },
    {
      "type": "click",
      "target": "main",
      "selectors": [
        [
          "#maincontent > canvas"
        ]
      ],
      "offsetY": 507,
      "offsetX": 1142
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    
    {
      "type": "click",
      "target": "main",
      "selectors": [
        [
          "#maincontent > canvas"
        ]
      ],
      "offsetY": 571,
      "offsetX": 1253,
      "duration": 1328.199999988079
    }
  ]
}

export async function run(extension) {
    const runner = await createRunner(flow, extension);
    await runner.run();
}
  
if (process && import.meta.url === url.pathToFileURL(process.argv[1]).href) {
    const extension = new CoverageExtension(browser, page, 7000)
    await run(extension);
}
  
await browser.close();