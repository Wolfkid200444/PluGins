/**
 * @name Roast
 * @source https://github.com/wolfkid200444/Plugins/blob/master/Roast/Roast.plugin.js
 * @updateUrl https://raw.githubusercontent.com/wolfkid200444/Plugins/master/Roast/Roast.plugin.js
 * @website https://github.com/wolfkid200444/Plugins/tree/master/Roast/Roast.plugin.js
 * @authorId 282978672711827456
 */

/*@cc_on
@if (@_jscript)
	
  // Offer to self-install for clueless users that try to run this directly.
  var shell = WScript.CreateObject("WScript.Shell");
  var fs = new ActiveXObject("Scripting.FileSystemObject");
  var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
  var pathSelf = WScript.ScriptFullName;
  // Put the user at ease by addressing them in the first person
  shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
  if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
     shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
  } else if (!fs.FolderExists(pathPlugins)) {
     shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
  } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
     fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
     // Show the user where to put plugins in the future
     shell.Exec("explorer " + pathPlugins);
     shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
  }
  WScript.Quit();
@else@*/

module.exports = (() => {
    const config = {
       main: 'index.js',
       info: {
          name: 'Roast',
          authors: [
             {
                name: 'wolfie',
                discord_id: '282978672711827456',
                github_username: 'wolfkid200444',
                twitter_username: ''
             }
          ],
          version: '1.0.3',
          description: 'Roast People.\nPlease go over Commands API to change prefix if u wish to',
          github: 'https://github.com/wolfkid200444',
          github_raw: 'https://raw.githubusercontent.com/wolfkid200444/Plugins/master/Roast/Roast.plugin.js'
          
       },
       "changelog": [
         {"title": "New Plugin","items": ["Currently in the testing"]}
     ],
       
    };
 
    const buildPlugin = ([Plugin, API]) => {
       return class Roast extends Plugin {
          constructor() {
             super();
          }
 
          async start() {
             commands.register({
                command: 'roast',
                description: 'Roast people...',
                usage: '{c} [user]',
                executor(args) {
                    const roasts = [
                        'My phone battery lasts longer than your relationships.',
                        'Calm down. Take a deep breath and then hold it for about twenty minutes.',
                        'Jealousy is a disease. Get well soon, bitch!',
                        'You’re so real. A real ass.',
                        'Whoever told you to be yourself gave you really bad advice.',
                        'If I had a face like yours I’d sue my parents.',
                        'Where’s your off button?',
                        'I didn’t change. I grew up. You should try it sometime.',
                        'I thought I had the flu, but then I realized your face makes me sick to my stomach.',
                        'The people who know me the least have the most to say.',
                        'I’m jealous of people who don’t know you.',
                        'I’m sorry that my brutal honesty inconvenienced your ego.',
                        'You sound reasonable… Time to up my medication.',
                        'Aww, it’s so cute when you try to talk about things you don’t understand.',
                        'Is there an app I can download to make you disappear?',
                        'I’m sorry, you seem to have mistaken me with a woman who will take your shit.',
                        'I’m visualizing duck tape over your mouth.',
                        '90% of your ‘beauty’ could be removed with a Kleenex.',
                        'I suggest you do a little soul searching. You might just find one.',
                        'Some people should use a glue stick instead of chapstick.',
                        'My hair straightener is hotter than you.',
                        'I have heels higher than your standards.',
                        'I’d smack you, but that would be animal abuse.',
                        'Why is it acceptable for you to be an idiot but not for me to point it out?',
                        'If you’re offended by my opinion, you should hear the ones I keep to myself.',
                        'If you’re going to be a smart ass, first you have to be smart, otherwise you’re just an ass.',
                        'Your face is fine but you will have to put a bag over that personality.',
                        'Hey, I found your nose, it’s in my business again!',
                        'I’m not an astronomer but I am pretty sure the earth revolves around the sun and not you.',
                        'I might be crazy, but crazy is better than stupid.',
                        'It’s scary to think people like you are allowed to vote.',
                        'Keep rolling your eyes. Maybe you’ll find your brain back there',
                        'No, no. I am listening. It just takes me a moment to process so much stupid information all at once.',
                        'I’m sorry, what language are you speaking? It sounds like bullshit.',
                        'poopoo head',
                    ];
                    let result
                    console.log(args)
                    return {
                       send: true,
                       result: `${args}, ` + roasts[Math.floor(Math.random() * roasts.length)]
                    }                 
                }
             });
          };
 
          stop() {
             commands.unregister('roast');
          };
       };
    };
 
    return !global.ZeresPluginLibrary || !global.XenoLib || !global.commands ? class {
       constructor() {
          this._XL_PLUGIN = true;
          this.start = this.load = this.handleMissingLib;
       }
 
       getName() {
          return this.name.replace(/\s+/g, '');
       }
 
       getAuthor() {
          return this.author;
       }
 
       getVersion() {
          return this.version;
       }
 
       getDescription() {
          return this.description + ' You are missing libraries for this plugin, please enable the plugin and click Download Now.';
       }
 
       start() { }
 
       stop() { }
 
       handleMissingLib() {
          let missing = {
             ZeresPluginLibrary: false,
             CommandsAPI: false
          };
          if (!global.ZeresPluginLibrary) missing.ZeresPluginLibrary = true;
          if (!global.commands) missing.CommandsAPI = true;
          let missingCount = 0;
          Object.values(missing).map(m => m ? missingCount++ : '');
 
          BdApi.showConfirmationModal(missingCount == 1 ? 'Library plugin needed' : 'Library plugins needed',
             `The library plugin${missingCount > 1 ? 's' : ''} needed for ${config.info.name} is missing. Please click Download to install the dependecies.`, {
             confirmText: 'Download',
             cancelText: 'Cancel',
             onConfirm: async () => {
                if (missing.ZeresPluginLibrary) {
                   await new Promise((fulfill, reject) => {
                      require('request').get('https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js', async (error, response, body) => {
                         if (error) {
                            return electron.shell.openExternal('https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js');
                         }
                         require('fs').writeFile(require('path').join(BdApi.Plugins.folder, '0PluginLibrary.plugin.js'), body, fulfill);
                      });
                   });
                }
                if (missing.CommandsAPI) {
                   await new Promise((fulfill, reject) => {
                      require('request').get('https://raw.githubusercontent.com/wolfkid200444/Plugins/master/CommandsAPI/CommandsAPI.plugin.js', async (error, response, body) => {
                         if (error) {
                            return electron.shell.openExternal('https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/wolfkid200444/Plugins/master/CommandsAPI/CommandsAPI.plugin.js');
                         }
                         require('fs').writeFile(require('path').join(BdApi.Plugins.folder, 'CommandsAPI.plugin.js'), body, fulfill);
                      });
                   });
                }
             }
          });
       }
 
       get [Symbol.toStringTag]() {
          return 'Plugin';
       }
 
       get name() {
          return config.info.name;
       }
 
       get short() {
          let string = '';
          for (let i = 0, len = config.info.name.length; i < len; i++) {
             const char = config.info.name[i];
             if (char === char.toUpperCase()) string += char;
          }
          return string;
       }
 
       get author() {
          return config.info.authors.map(author => author.name).join(', ');
       }
 
       get version() {
          return config.info.version;
       }
 
       get description() {
          return config.info.description;
       }
    } : buildPlugin(global.ZeresPluginLibrary.buildPlugin(config));
 })();