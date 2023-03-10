const CURRENT_APP_INDEX_KEY = '__currentAppIndex'
const STATE_KEY = '__state'
const APP_STATE_KEY = '__app_state'

interface ApplicationCandidate
{
    title: string;
    scheme: string;
    result: boolean;
};

function applications(): ApplicationCandidate[]
{
    return [
        {
            title : 'Skype',
            scheme: 'skype',
            result: false
        },
        {
            title : 'Spotify',
            scheme: 'spotify',
            result: false
        },
        {
            title : 'Zoom',
            scheme: 'zoommtg',
            result: false
        },
        {
            title : 'vscode',
            scheme: 'vscode',
            result: false
        },
        {
            title : 'Epic Games',
            scheme: 'com.epicgames.launcher',
            result: false
        },
        {
            title : 'Telegram',
            scheme: 'tg',
            result: false
        },
        {
            title : 'Discord',
            scheme: 'discord',
            result: false
        },
        {
            title : 'Slack',
            scheme: 'slack',
            result: false
        },
        {
            title : 'Steam',
            scheme: 'steam',
            result: false
        },
        {
            title : 'Battle.net',
            scheme: 'battlenet',
            result: false
        },
        {
            title : 'Xcode',
            scheme: 'xcode',
            result: false
        },
        {
            title : 'NordVPN',
            scheme: 'nordvpn',
            result: false
        },
        {
            title : 'Sketch',
            scheme: 'sketch',
            result: false
        },
        {
            title : 'Teamviewer',
            scheme: 'teamviewerapi',
            result: false
        },
        {
            title: 'Microsoft Word',
            scheme: 'word',
            result: false
        },
        {
            title: 'WhatsApp',
            scheme: 'whatsapp',
            result: false
        },
        {
            title: 'Postman',
            scheme: 'postman',
            result: false
        },
        {
            title: 'Adobe',
            scheme: 'aem-asset',
            result: false
        },
        {
            title: 'Messenger',
            scheme: 'messenger',
            result: false
        },
        {
            title: 'Figma',
            scheme: 'figma',
            result: false
        },
        {
            title: 'Hotspot Shield',
            scheme: 'hotspotshield',
            result: false
        },
        {
            title: 'ExpressVPN',
            scheme: 'expressvpn',
            result: false
        },
        {
            title: 'Notion',
            scheme: 'notion',
            result: false
        },
        {
            title: 'iTunes',
            scheme: 'itunes',
            result: false
        }      
        
    ];
}

function createFrame(name: string, applicationUrl: string):HTMLIFrameElement
{
    let iframe = null;

    if(!document.getElementById(name))
    {
        iframe = document.createElement('iframe');
        iframe.src = applicationUrl;
        iframe.style.opacity = '0';
        iframe.name = name;        
        iframe.id = name;

        window.document.body.appendChild(iframe);
    }
    else
    {
        iframe = document.getElementById(name) as HTMLIFrameElement;
        
        iframe.src = "about:blank";

        iframe.src = applicationUrl;
    }

    return iframe;
}

export function invokedWithFrame(iframeName: string): ApplicationCandidate[]
{    
    return applications().map(item=>{

        const iframe = createFrame(iframeName, item.scheme + '://test');

        if(iframe.contentDocument)
        {
            item.result = true;
        }

        return item;
    });
}

export enum ApplicationState {
    Ready = 'ready',
    InProgress = 'in-progress',
    Welcome = 'welcome',
    Alerted = 'alerted',
  }

  export enum DetectionResult {
    Waiting,
    Ready,
  }
  
  export enum AlertMessage {
    FocusWindow = 'Please keep the browser window focused.',
    MissingPopup = 'Please keep the popup opened and do not close it.',
    Unexpected = 'Unexpected error happened',
  }

export function isDetectionCompleted() {
  return getCurrentIndex() >= getLength()
}

export function getCurrentIndex() {
    return Number(localStorage.getItem(CURRENT_APP_INDEX_KEY))
  }

  export function getLength() {
    return applications.length
  }
  export function setInternalApplicationState(state: ApplicationState) {
    localStorage.setItem(APP_STATE_KEY, state)
  }
export async function detectChrome() {
    if (isDetectionCompleted()) {
      setInternalApplicationState(ApplicationState.Ready)
  
      const handler = getAdditionalWindow()
      handler.close()
  
      return DetectionResult.Waiting
    }
  
    await invokeWithFrame('main', async () => {
      if (getCurrentIndex() === 0) {
        await Promise.all([assetsPromise, wait(conditionalTiming(300, 400))])
      }
  
      const handler = getAdditionalWindow()
      let isDetected = true
  
      const input = document.createElement('input')
      input.style.opacity = '0'
      input.style.position = 'absolute'
      input.onfocus = () => {
        isDetected = false
      }
  
      await wait(conditionalTiming(40, 100)) // emperical
  
      const isBrowserActive = document.hasFocus() || handler.document.hasFocus()
      if (!isBrowserActive) {
        throw AlertMessage.FocusWindow
      }
  
      // Make test
      if (document.hasFocus()) {
        document.body.insertBefore(input, document.getElementById('app'))
      } else {
        handler.document.body.appendChild(input)
      }
  
      handler.location.replace(getCurrentApplicationUrl())
  
      await wait(conditionalTiming(125, 250)) // emperical
  
      input.focus()
      await wait(conditionalTiming(15, 50))
      input.remove()
  
      saveDetectionResult(isDetected)
      handler.location.replace('/pdf')
  
      await waitForEmbedElemet()
      await wait(conditionalTiming(400, 800)) // emperical
  
      handler.location.replace('about:blank')
  
      await waitForLocation('about:blank')
    })
  
    return isPopupWindow() ? DetectionResult.Waiting : DetectionResult.Ready
  }
