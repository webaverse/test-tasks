import url from 'url';
import { createRunner, PuppeteerRunnerExtension } from '@puppeteer/replay';
import pti from 'puppeteer-to-istanbul';
import puppeteer from 'puppeteer';
import { start } from 'repl';

let i = 0

// var newHigh = typeof window !== 'undefined' ? localStorage.getItem('highest score') : 0

const browser = await puppeteer.launch({
    headless: true,
});

const page = await browser.newPage();
await page.goto('https://webaverse-alan-cousin.netlify.app/')
const f = await page.$("#highest")
const text = await (await f.getProperty('textContent')).jsonValue()
console.log("Text is: ", text)

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
      console.log('before', step);
    }
    
    async afterEachStep(step, flow) {
      await super.afterEachStep(step, flow);    
      const f = await page.$("#highest")
        const text = await (await f.getProperty('textContent')).jsonValue()
        console.log("Text is: ", text)
      if (step.key == ' ' && step.type == 'keyDown') {
        await page.screenshot({ path: `./testOutputs/screenshots${i}.png` });
        i++;
      }
      console.log('after', step);
    }

    async afterAllSteps(flow) {
      await this.stopCoverage();
      await super.afterAllSteps(flow);
      console.log('done');
    }
}

export const flow = {
    "title": "full_test",
    "steps": [
      {
        "type": "setViewport",
        "width": 1440,
        "height": 757,
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
        "type": "keyDown",
        "target": "main",
        "key": " "
      },
      {
        "type": "keyDown",
        "target": "main",
        "key": " "
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
        "type": "keyDown",
        "target": "main",
        "key": "d"
      },
      {
        "type": "keyDown",
        "target": "main",
        "key": "w"
      },
      {
        "type": "keyDown",
        "target": "main",
        "key": "d"
      },
      {
        "type": "keyDown",
        "target": "main",
        "key": "w"
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
        "type": "keyDown",
        "target": "main",
        "key": "d"
      },
      {
        "type": "keyDown",
        "target": "main",
        "key": "s"
      },
      {
        "type": "keyUp",
        "key": " ",
        "target": "main"
      },
      {
        "type": "keyUp",
        "key": "d",
        "target": "main"
      },
      {
        "type": "keyUp",
        "key": "s",
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
        "key": "s"
      },
      {
        "type": "keyUp",
        "key": "s",
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
      }
    ],
    "timeout": 30000
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