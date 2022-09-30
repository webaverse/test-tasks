import url from 'url';
import { createRunner, PuppeteerRunnerExtension } from '@puppeteer/replay';
import pti from 'puppeteer-to-istanbul';
import puppeteer from 'puppeteer';

import chai from 'chai' 
var expect = chai.expect;  

let score = 0;
let positionX = 0;
let positionY = 0;
let positionZ = 0;
let jumpCount = 0;
let lastJump = 0;
const timeLimit = 1000;

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
      const posXElement = await page.$("#positionX")
      const textX = await (await posXElement.getProperty('textContent')).jsonValue()
      positionX = parseFloat(textX.split(" ").pop());

      const posZElement = await page.$("#positionZ")
      const textZ = await (await posZElement.getProperty('textContent')).jsonValue()
      positionZ = parseFloat(textZ.split(" ").pop());

      const posYElement = await page.$("#current")
      const textY = await (await posYElement.getProperty('textContent')).jsonValue()
      positionY = parseFloat(textY.split(" ").pop());
      console.log("posXElement, posZElement is", positionX, positionZ)
      console.log('before', step);
    }
    
    async afterEachStep(step, flow) {
      await super.afterEachStep(step, flow);    

      const posXElement = await page.$("#positionX")
      const textX = await (await posXElement.getProperty('textContent')).jsonValue()
      const positionXAfter = parseFloat(textX.split(" ").pop());

      const posZElement = await page.$("#positionZ")
      const textZ = await (await posZElement.getProperty('textContent')).jsonValue()
      const positionZAfter = parseFloat(textZ.split(" ").pop());

      console.log("positionXAfter, positionZAfter is", positionXAfter, positionZAfter)

      const f = await page.$("#highest")
      const text = await (await f.getProperty('textContent')).jsonValue()
      const highest = parseFloat(text.split(" ").pop());

      const posYElement = await page.$("#current")
      const textY = await (await posYElement.getProperty('textContent')).jsonValue()
      const positionYAfter = parseFloat(textY.split(" ").pop());
      
      if ((step.type == 'keyUp') && (step.key == 'w')) {
          console.log("w key was succesfully inputed");
          try {
            expect(positionZ).to.be.greaterThan(positionZAfter)
           } catch (e) { 
            console.log ("w key not inputed")
          }
      }

      if ((step.type == 'keyUp') && (step.key == 's')) {
          console.log("s key was succesfully inputed");
          try { 
            expect(positionZAfter).to.be.greaterThan(positionZ)
          } catch (e) { 
            console.log ("s key not inputed")
          }
      }

      if ((step.type == 'keyUp') && (step.key == 'a')) {
          console.log("a key was succesfully inputed");
          try { 
            expect(positionX).to.be.greaterThan(positionXAfter)
          } catch (e) { 
            console.log ("a key not inputed")
          }
      }

      if ((step.type == 'keyUp') && (step.key == 'd')) {
        console.log("d key was succesfully inputed");
        try {
          expect(positionXAfter).to.be.greaterThan(positionX)
        } catch (e) { 
          console.log ("d key not inputed")
        }
      }      

      if ((Date.now()-lastJump) > timeLimit) {
        jumpCount = 0;
      }

      if ((step.type == 'keyDown') && (step.key == ' ')) {
        console.log("Space key was succesfully inputed");
        if (jumpCount < 2)
        {
          try {
            expect(positionYAfter).to.be.greaterThan(positionY)  //check first space jump
            jumpCount ++;
            lastJump = Date.now();
          } catch (e) {
            console.log("jump failed")
          } 
        } else{
          console.log("Jumping is disable after double Jump.")
        }
         
      }
      console.log("current height is: ", highest)
      if (highest > score) {
        score = highest; 
        await page.screenshot({ path: `./testOutputs/{${score}}.png` });
      }
      
      

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
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    {
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    {
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    {
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    {
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    {
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    {
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    {
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    {
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    {
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "d"
    },
    {
      "type": "keyUp",
      "key": "d",
      "target": "main"
    },
    {
      "type": "click",
      "target": "main",
      "selectors": [
        [
          "#maincontent > canvas"
        ]
      ],
      "offsetY": 610,
      "offsetX": 1230,
      "duration": 1318.9000000059605
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": " "
    },
    {
      "type": "keyUp",
      "key": " ",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": " "
    },
    {
      "type": "keyUp",
      "key": " ",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "w"
    },
    {
      "type": "keyUp",
      "key": "w",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": " "
    },
    {
      "type": "keyUp",
      "key": " ",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": " "
    },
    {
      "type": "keyUp",
      "key": " ",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "z"
    },
    {
      "type": "keyUp",
      "key": "z",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": " "
    },
    {
      "type": "keyUp",
      "key": " ",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": " "
    },
    {
      "type": "keyUp",
      "key": " ",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
    },
    {
      "type": "keyDown",
      "target": "main",
      "key": "a"
    },
    {
      "type": "keyUp",
      "key": "a",
      "target": "main"
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