


//Importing necessary elements for React
import React, {Component} from 'react';
import '../css/HtmlStyle.css';
import '../css/styleGraph.css';
import myInfo from '../Info/PersonalInfo.js';

//Drag main finder screen around
import Draggable from 'react-draggable';

//Animations (most are unused);
// import $ from 'jquery';
import { fadeIn } from 'react-animations';
import { fadeOut, fadeOutUp, zoomOut, slideOutLeft } from 'react-animations';
import { zoomOutDown} from 'react-animations';
import { VelocityTransitionGroup } from 'velocity-react';
import 'velocity-animate/velocity.ui';

//Aphrodite for CSS styling
import { StyleSheet, css } from 'aphrodite/no-important';

//React Components
import GroupsBar from './GroupsBar';
import FilesBar from './FilesBar';
import DescBar from './DescBar';
import IconBar from './IconBar';
import CloseButton from './CloseButton';

//Custom images done here
import Profile from '../images/Profile.png';
import Experience from '../images/Experience.png';
import Projects from '../images/Projects.png';
import Highlights from '../images/badge.png';
import Network from '../images/Network.png';
import Languages from '../images/Languages.png';
import Education from '../images/Education.png';
import Other from '../images/Other.png';

import Document from '../images/Document.png';
import Coding from '../images/coding.png';
import ProjectsIcon from '../images/ProjectsIcon2.png';
import LinkedIn from '../images/Network/linkedin2-min.png';
import GitHub from '../images/Network/github2-min.png';
import Facebook from '../images/Network/facebook2-min.png';
import Email from '../images/Network/email2-min.png';
import HTMLCoding from '../images/html-coding.png';
import Chat from '../images/chat.png';
import College from '../images/college.png';
import School from '../images/open-book.png';
import Newspaper from '../images/newspaper.png';
import Award from '../images/award.png';


import ProfilePic from '../images/Edward_ProfilePic.png';
import MetroLogo from '../images/MetroNewsLogo.png';
import CANewsLogo from '../images/CANewsOttawaLogo.png';
import OttawaTechLogo from '../images/OttawaTechWatchLogo.png';


//Image icons to be displayed in left-most "groupsBar" (All images are displayed at once)
var groupIconImages = [
  Profile, Experience, Projects, Highlights, Network, Languages, Education, Other,
]

//Image icons to be displayed in middle "filesBar" (Only 1 array of images are displayed at once)
var fileIconImages = [
  [Document, Document], //Profile
  [Coding, Coding],  //Experience
  [ProjectsIcon, ProjectsIcon, ProjectsIcon, ProjectsIcon],   //Projects
  [Newspaper, Newspaper, Newspaper, Award, Award], //Highlights
  [LinkedIn, GitHub, Facebook, Email], //Network
  [HTMLCoding, Chat], //Languages
  [College, School], //Education
  [Document, Document, Document, Document, Document], //Other
]
//Images to be displayed in right-most "descBar" (Only 1 image is displayed at once)
var infoDescImages = [
  [ProfilePic, ""], //Profile
  ["", ""], //Experience
  ["", "", "", ""], //Projects
  [MetroLogo, CANewsLogo, OttawaTechLogo, "", ""],
  [LinkedIn, GitHub, Facebook, Email], //Network
  ["", ""], //Languages
  ["", ""], //Education
  ["", "", "", "", ""], //Other
]
//Custom images ends

class FinderDisplay extends Component {



  constructor(props) {
    super(props);
    this.state = {
      groupIndex: 0,
      fileIndex: 0,
      animate: 0,
      trash: 0,
      reload: 0,
      visible: 0,
      size: 0,
      minimize: 0,
      expandFull: 0,
    };
    this.changeState = this.changeState.bind(this);
    this.resetAnimation = this.resetAnimation.bind(this);


  }

  groupClick(i) {
    //This is activated when a group (Profile, Work, Projects etc ) is clicked
    this.setState({
      groupIndex: i,
      fileIndex: 0,
      animate: this.state.animate+1,
    })
  }
  fileClick(i) {
    //This is activated when a file (Readme, About FinderMe etc ) is clicked
    console.log("File clicked");
    this.setState({
      fileIndex: i,
      animate: this.state.animate+1,

    })
  }

  iconClick(i) {
    //This is activated when of the two icons on the bottom left is clicked
    if (i == 1) {
      this.setState({
        reload: this.state.reload+1,
        visible: this.state.visible+1,
        trash : 0
      })




    } else if (i == 2) {
      if (this.state.trash == 1) {
        this.setState({
          trash: 0,
          minimize: 0,
        })
      } else if (this.state.trash == 0) {
        this.setState({
          trash: 1,
          minimize: 0,
        })
      }

    }

  }

  changeState() {
    //Resets everything to default state and reloads
    this.setState({
      groupIndex: 0,
      fileIndex: 0,
      minimize: 0,
      reload: this.state.reload+1,

    })
  }

  resetAnimation() {
    //resets the animations to none
    document.getElementById("backShadow").style.webkitAnimationName = "";
    document.getElementsByClassName("bothWindows")[0].style.webkitAnimationName = "";
    document.getElementsByClassName("finderTopBar")[0].style.webkitAnimationName = "";
    document.getElementsByClassName("bottomElemeents")[0].style.webkitAnimationName = "";
    document.getElementsByClassName("finderSideBar")[0].style.webkitAnimationName = "";
    document.getElementsByClassName("finderFilesBar")[0].style.webkitAnimationName = "";
    document.getElementsByClassName("finderDescriptionBar")[0].style.webkitAnimationName = "";
    for (var i = 0; i < myInfo.info[this.state.groupIndex].length;i++) {
      document.getElementsByClassName("fileStyle")[i].style.webkitAnimationName = "";      document.getElementsByClassName("fileStyle2")[i].style.webkitAnimationName = "";
    }
    for (var i = 0; i < myInfo.info.length;i++) {
      document.getElementsByClassName("groupStyle")[i].style.webkitAnimationName = "";      document.getElementsByClassName("groupStyle2")[i].style.webkitAnimationName = "";
    }
  }

  navClick(i) {

    if (i == 0 ){
      // console.log("Close Window clicked");
      setTimeout(this.changeState, 500);
      this.setState({
        trash: 1,
        minimize: 0,

      })




    } else if (i == 1) {
      // console.log("Minimize Window clicked");
      this.setState({
        trash: 1,
        minimize: 1,
      })

    }  else if (i == 2) {
      // console.log("expand window clicked");
      var html = document.getElementsByTagName('html')[0];

      if (this.state.expandFull == 0) {
        //SPAGHETTI CODE!!!
        this.setState({
          expandFull: 1,
        })
        //Transition animation when the expand navigation button is clicked (green circle in top left of finder display)
        document.getElementById("backShadow").style.webkitAnimationName = "totalTransform";
        document.getElementById("backShadow").style.webkitAnimationDuration = "0.15s";
        document.getElementsByClassName("bothWindows")[0].style.webkitAnimationName = "totalTransform";
        document.getElementsByClassName("bothWindows")[0].style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("finderTopBar")[0].style.webkitAnimationName = "topTransform";
        document.getElementsByClassName("finderTopBar")[0].style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("bottomElemeents")[0].style.webkitAnimationName = "bottomTransform";
        document.getElementsByClassName("bottomElemeents")[0].style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("finderSideBar")[0].style.webkitAnimationName = "groupTransform";
        document.getElementsByClassName("finderSideBar")[0].style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("finderFilesBar")[0].style.webkitAnimationName = "fileTransform";
        document.getElementsByClassName("finderFilesBar")[0].style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("finderDescriptionBar")[0].style.webkitAnimationName = "descTransform";
        document.getElementsByClassName("finderDescriptionBar")[0].style.webkitAnimationDuration = "0.15s";

        //The code below transforms the chart. However, it crashes if there is a page without a chart so the conditional statement avoids this crash.
        if (myInfo.info[this.state.groupIndex][this.state.fileIndex].length > 7) {
          document.getElementsByTagName("dl")[0].style.webkitAnimationName = "chartTransform";
          document.getElementsByTagName("dl")[0].style.webkitAnimationDuration = "0.15s";
        }


        for (var i = 0; i < myInfo.info[this.state.groupIndex].length;i++) {
          document.getElementsByClassName("fileStyle")[i].style.webkitAnimationName = "fileStyleTransform";
          document.getElementsByClassName("fileStyle")[i].style.webkitAnimationDuration = "0.15s";
          document.getElementsByClassName("fileStyle2")[i].style.webkitAnimationName = "fileStyleTransform";
          document.getElementsByClassName("fileStyle2")[i].style.webkitAnimationDuration = "0.15s";
        }
        for (var i = 0; i < myInfo.info.length;i++) {
          document.getElementsByClassName("groupStyle")[i].style.webkitAnimationName = "groupStyleTransform";
          document.getElementsByClassName("groupStyle")[i].style.webkitAnimationDuration = "0.15s";
          document.getElementsByClassName("groupStyle2")[i].style.webkitAnimationName = "groupStyleTransform";
          document.getElementsByClassName("groupStyle2")[i].style.webkitAnimationDuration = "0.15s";
        }
        html.style.setProperty("--totalWidth", "75vw");
        html.style.setProperty("--totalHeight", "90vh");
        html.style.setProperty("--topWidth",  "75vw");
        html.style.setProperty("--topHeight", "10vh");
        html.style.setProperty("--groupWidth", "15vw");
        html.style.setProperty("--groupHeight", "75vh");
        html.style.setProperty("--fileWidth", "15vw");
        html.style.setProperty("--fileHeight", "75vh");
        html.style.setProperty("--descWidth", "45vw");
        html.style.setProperty("--descHeight", "75vh");
        html.style.setProperty("--chartWidth", "35vw");
        setTimeout(this.resetAnimation, 150);

      } else {
        //EVEN MORE SPAGHETTI CODE!!!!
        html.style.setProperty("--totalWidth", "600px");
        html.style.setProperty("--totalHeight", "450px");
        html.style.setProperty("--topWidth", "600px");
        html.style.setProperty("--topHeight", "70px");
        html.style.setProperty("--groupWidth", "130px");
        html.style.setProperty("--groupHeight", "380px");
        html.style.setProperty("--fileWidth", "180px");
        html.style.setProperty("--fileHeight", "380px");
        html.style.setProperty("--descWidth", "290px");
        html.style.setProperty("--descHeight", "380px");
        html.style.setProperty("--chartWidth", "140px");
        setTimeout(this.resetAnimation, 150);
        console.log("minimizng");
        this.setState({
          expandFull: 0,
        })
        document.getElementById("backShadow").style.webkitAnimationName = "totalTransformRev";
        document.getElementById("backShadow").style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("bothWindows")[0].style.webkitAnimationName = "totalTransformRev";
        document.getElementsByClassName("bothWindows")[0].style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("finderTopBar")[0].style.webkitAnimationName = "topTransformRev";
        document.getElementsByClassName("finderTopBar")[0].style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("bottomElemeents")[0].style.webkitAnimationName = "bottomTransformRev";
        document.getElementsByClassName("bottomElemeents")[0].style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("finderSideBar")[0].style.webkitAnimationName = "groupTransformRev";
        document.getElementsByClassName("finderSideBar")[0].style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("finderFilesBar")[0].style.webkitAnimationName = "fileTransformRev";
        document.getElementsByClassName("finderFilesBar")[0].style.webkitAnimationDuration = "0.15s";

        document.getElementsByClassName("finderDescriptionBar")[0].style.webkitAnimationName = "descTransformRev";
        document.getElementsByClassName("finderDescriptionBar")[0].style.webkitAnimationDuration = "0.15s";

        //The code below transforms the chart. However, it crashes if there is a page without a chart so the conditional statement avoids this crash.
        if (myInfo.info[this.state.groupIndex][this.state.fileIndex].length > 7) {
          document.getElementsByTagName("dl")[0].style.webkitAnimationName = "chartTransformRev";
          document.getElementsByTagName("dl")[0].style.webkitAnimationDuration = "0.15s";
        }
        for (var i = 0; i < myInfo.info[this.state.groupIndex].length;i++) {
          document.getElementsByClassName("fileStyle")[i].style.webkitAnimationName = "fileStyleTransformRev";
          document.getElementsByClassName("fileStyle")[i].style.webkitAnimationDuration = "0.15s";
          document.getElementsByClassName("fileStyle2")[i].style.webkitAnimationName = "fileStyleTransformRev";
          document.getElementsByClassName("fileStyle2")[i].style.webkitAnimationDuration = "0.15s";
        }

        for (var i = 0; i < myInfo.info.length;i++) {
          document.getElementsByClassName("groupStyle")[i].style.webkitAnimationName = "groupStyleTransformRev";
          document.getElementsByClassName("groupStyle")[i].style.webkitAnimationDuration = "0.15s";
          document.getElementsByClassName("groupStyle2")[i].style.webkitAnimationName = "groupStyleTransformRev";
          document.getElementsByClassName("groupStyle2")[i].style.webkitAnimationDuration = "0.15s";
        }



      }
    }
  }





  render() {

    var styles = StyleSheet.create({
      fadeIn: {
        animationName: fadeIn,
        animationDuration: '0.4s'

      },
      fadeOut: {
        // animationName: merge(fadeOutDown, zoomOutDown),
        animationName: fadeOut,

        animationDuration: '0.2s'

      },

      fadeOutUp: {
        // animationName: merge(fadeOutDown, zoomOutDown),
        animationName: fadeOutUp,

        animationDuration: '0.2s'
      },

      doNothing: {

      }

    })

    var opacityStyle;
    if (this.state.trash == 0) {
      opacityStyle = {
        opacity: "1.0",
      }
    } else {
      opacityStyle = {
        opacity: "0.0",
      }
    }

    //Spaghetti code that changes animation based on trash/minimize state. The goal is: Red - fadeout, Yellow - fadeoutUp, other (bottom left icon clicked) - fadein
    const fadeAnimate = css(
      this.state.trash ? (this.state.minimize? styles.fadeOutUp : styles.fadeOut) : styles.fadeIn,
      // this.state.minimize? styles.fadeOutUp : styles.fadeOut
    )

    return(
      <div>
        <div style = {opacityStyle} className={fadeAnimate} >
          <div >
            <Draggable key = {this.state.visible}  defaultPosition={{x: 0, y: 0}}>


              <div id="backShadow" className="draggable">
                <div className="bothWindows">
                  <div className="finderTopBar">
                    <CloseButton
                      trash = {this.state.trash}
                      onClick={i => this.navClick(i)}
                    />
                    <div className="headerDisplay">

                      <div className="finderTopBarIcon"></div>
                      <div className="finderTopBarText">
                        {/* Your name displayed here, for example 'Edward Ren' */}
                        <p id="finderTopBarTextP">{myInfo.groupNames[0]}</p>
                      </div>
                    </div>

                  </div>
                  <div className="bottomElemeents">

                    <div className="finderSideBar">

                      <GroupsBar

                        groupIndex= {this.state.groupIndex}
                        fileIndex= {this.state.fileIndex}
                        groups ={myInfo.groupNames}
                        groupsImage = {groupIconImages}
                        onClick={i => this.groupClick(i)}
                        animate = {this.state.animate}
                      />

                    </div>
                    {/* <Fade> */}
                    <div className="finderFilesBar" key = "1">

                      <FilesBar
                        fileIndex = {this.state.fileIndex}
                        filesText = {myInfo.info[this.state.groupIndex]}
                        filesImage = {fileIconImages[this.state.groupIndex]}
                        onClick = {i => this.fileClick(i)}
                        animate = {this.state.animate}
                      />
                    </div>
                    {/* </Fade> */}
                    <div className="finderDescriptionBar">
                      <div key = {this.state.animate} id = "groupBar" className={css(styles.fadeIn)} >
                        {//This fade in animation will only trigger if state within the enclosing div is changed, that is why we set the key to this.state.animate to trigger a re-render. Other functions ensure this.state.animate will always be unique and changed on click
                        }
                        <DescBar
                          groupIndex = {this.state.groupIndex}
                          fileIndex = {this.state.fileIndex}
                          content = {myInfo.info[this.state.groupIndex][this.state.fileIndex]}
                          contentImages = {infoDescImages[this.state.groupIndex][this.state.fileIndex]}
                          onClick = { i => this.props.onClick(i)}

                        />
                      </div>
                    </div>



                  </div>
                </div>
              </div>

            </Draggable>
          </div>
        </div>

        {/* Bottom left icons */}
        <div className = "backIcons">
          <IconBar
            trash = {this.state.trash}
            onClick= {i => this.iconClick(i)}

          />

        </div>
        {/* <Draggable key = {this.state.visible}> */}

        {/* </Draggable> */}
      </div>
      //  {/* </div> */}

    )
  }



}




export default FinderDisplay;
