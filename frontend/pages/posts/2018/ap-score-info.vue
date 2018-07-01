<template>
  <section class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-2 is-3-tablet">
          <aside class="menu sticky-menu">
            <ul class="menu-list">
              <li>
                <a href="#getting-scores">Getting Your Scores</a>
                <ul>
                  <li><a href="#sending-scores">Sending Scores to Colleges</a></li>
                  <li><a href="#early-scores">Early Score Access</a></li>
                </ul>
              </li>
              <li>
                <a href="#release-schedule">Release Schedule</a>
                <ul>
                  <li><a href="#release-map">Map</a></li>
                  <li><a href="#release-table">Time Table</a></li>
                </ul>
              </li>
              <li><a href="#score-distributions">Score Distributions</a></li>
            </ul>
          </aside>
        </div>
        <div class="column">
          <section>
            <h1 class="title">2018 AP Score Info</h1>
            <h2 class="subtitle">How to get your 2018 AP scores, when, where, and more</h2>
            <span>May 19, 2018</span>
            <hr>
            <p>Congratulations on finishing your AP tests! Now, an even bigger challenge looms on the horizon... <b>facing your scores</b>.</p>
          </section>
          <hr>
          <section id="release-schedule">
            <h3 class="is-size-3">Release Schedule</h3>
            <a-p-score-countdown />
            <hr>
            <h4 class="is-size-4">Interactive Map</h4>
            <div id="release-map">
              <score-release-map :area-list="areaList" />
            </div>
            <table id="release-table" class="table">
              <thead>
                <tr>
                  <th>Release Date</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p><b>Thursday, July 5</b></p>
                    <p>8AM ET</p>
                    <p>7AM CT</p>
                    <p>6AM MT</p>
                    <p>5AM PT</p>
                    <p>4AM AKT</p>
                    <p>2AM HAT</p>
                  </td>
                  <td>
                    <p>Alaska, California, Hawaii, Idaho, Minnesota, Montana, North Dakota, Oregon, South Dakota, Washington</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>Friday, July 6</b></p>
                    <p>8AM ET</p>
                    <p>7AM CT</p>
                  </td>
                  <td>
                    <p>Indiana, Michigan, New Jersey, New York, Ohio, Pennsylvania, Wisconsin</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>Saturday, July 7</b></p>
                    <p>8AM ET</p>
                  </td>
                  <td>
                    <p>Connecticut, Delaware, District of Columbia, Florida, Georgia, Maine, Maryland, Massachusetts, New Hampshire, Rhode Island, South Carolina, Vermont</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>Sunday, July 8</b></p>
                    <p>8AM ET</p>
                    <p>7AM CT</p>
                    <p>6AM MT</p>
                  </td>
                  <td>
                    <p>Kentucky, North Carolina, Tennessee, Texas, Virginia, West Virginia</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>Monday, July 9</b></p>
                    <p>8AM ET</p>
                    <p>7AM CT</p>
                    <p>6AM MT</p>
                    <p>5AM PT</p>
                  </td>
                  <td>
                    <p>Alabama, Arizona, Arkansas, Colorado, Illinois, Iowa, Kansas, Louisiana, Mississippi, Missouri, Nebraska, Nevada, New Mexico, Oklahoma, Utah, Wyoming</p>
                    <br>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p><b>Monday, July 9</b></p>
                    <p>12PM UTC</p>
                  </td>
                  <td>
                    <p>Canada, U.S. Territories, International</p>
                    <p>International Space Station, Mars, Elon Musk's Space Roadster</p>
                    <p>Basically everywhere else</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <hr>
          <section id="getting-scores">
            <h3 class="is-size-3">Getting Your Scores</h3>
            <div class="content">
              <p>College Board provides access to AP scores on their official website at <a target="_blank" rel="noopener noreferrer" href="https://apscore.collegeboard.org/scores">https://apscore.collegeboard.org/scores</a> (or <a target="_blank" rel="noopener noreferrer" href="https://apscore.org">https://apscore.org</a> or <a target="_blank" rel="noopener noreferrer" href="https://apscores.org">https://apscores.org</a>). On your region's assigned date and time, you can log into the AP scores website and check your scores. The scores website may be overloaded from the hundreds of thousands of other students, so be patient!</p>
              <p>Score access is based on <u>where you are</u> that day, not where you live or where you took the test (for example, if you live in Chicago, but you are visiting Los Angeles for the first week of July, you will be able to view your scores on July 5th, California's assigned score release day). Each day, another section of the USA gets access to 2018 AP scores <b>at 8AM Eastern Time</b> (so 7AM CT, 6AM MT, 5AM PT, 12PM UTC, etc.). An interactive map of the release schedule is located further down this page.</p>
              <p>You will need a College Board account to access your scores. Here are some tips to make sure your scores and score access will not be delayed:</p>
              <ul>
                <li><a target="_blank" rel="noopener noreferrer" href="https://apscore.collegeboard.org/scores">Try logging into your account on the official website <u>before July</u></a>, to make sure everything is in order. Last year, some people didn't do this and discovered problems with their accounts on the score release day!</li>
                <li>If you don't have an account, <a target="_blank" rel="noopener noreferrer" href="https://account.collegeboard.org/iamweb/smartRegister?appId=287&DURL=https://apscore.collegeboard.org/scores/view-your-scores">sign up on the official website <u>before July</u></a>. The system tends to get overloaded as the score release day approaches.</li>
                <li><a target="_blank" rel="noopener noreferrer" href="https://account.collegeboard.org/login/login?DURL=https%3A%2F%2Fapscore.collegeboard.org%2Fscores%2FdisplayVerifyAccount.action">Make sure you've filled out all your information on the AP website</a>. If you have your AP number and/or student ID number, fill those fields out. If you don't, <a href="https://apstudent.collegeboard.org/help#What%20do%20I%20do%20if%20I%20don’t%20have%20my%20AP%20number%3F">visit the AP help page</a>.</li>
                <li>Don't stress! The hard part -- studying for and taking the AP tests -- is over! Also, it's not the end of the world if your score is lower than expected -- colleges care less about your AP scores than you think.</li>
              </ul>
            </div>
            <hr>
            <h4 id="sending-scores" class="is-size-4">Sending Scores to Colleges</h4>
            <div class="content">
              <blockquote>"How do I send my scores to <i>XYZ</i> College?"</blockquote>
              <p>There was an option on your AP Scantron to send a free score report. If you didn't use that, you can still pay to send your AP score reports to colleges <a target="_blank" rel="noopener noreferrer" href="https://apscore.collegeboard.org/scores/score-reporting">on the CollegeBoard website</a>. The score report will contain <u>all your AP scores from the past 4 years.</u></p>
              <p>If you're not sure if you sent a score report to a college, you can go to the <a target="_blank" rel="noopener noreferrer" href="https://apscore.collegeboard.org/scores/send/historyAction.action">past score orders page</a> to view them. Note that this page may not be updated until July</p>
              <p>From June 15 to July 2, CollegeBoard will not process score report orders until July 3rd, but orders from July 3 to July 13 are automatically upgraded to rush delivery. Your college will take 1-2 weeks to receive the score report, so plan with that in mind.</p>
              <p>For more information, consult the <a target="_blank" rel="noopener noreferrer" href="https://apscore.collegeboard.org/scores/score-reporting">official AP score reporting website</a>.</p>
            </div>
            <hr>
            <h4 id="early-scores" class="is-size-4">Early Score Access</h4>
            <div class="content">
              <blockquote>"I don't live in/will not be in Northern/Western USA, but I still want to get my scores on July 5th. How?"</blockquote>
              <p>Let me preface this by saying that the internet is a vast and dangerous place. When asking this question, <b>please consider its security and privacy implications, and decide if the convenience is worth it</b>.</p>
              <hr>
              <h4 class="is-size-4">The Normal Method</h4>
              <h6 class="is-size-6">By far the safest method, but somewhat frustrating</h6>
              <p>Just do it the way College Board intended! This is the safest way, since you're sending your password directly to College Board. Plus, do you really need to see your scores a day early?</p>
              <p>How: on your region's scheduled day, <a target="_blank" rel="noopener noreferrer" href="https://apscore.collegeboard.org/scores">log into the official website and check your scores</a>.</p>
              <hr>
              <h4 class="is-size-4">The VPN/Proxy Method</h4>
              <h6 class="is-size-6">Mostly safe, but inconvenient and potentially dangerous</h6>
              <p>A VPN (Virtual Private Network) or Proxy Server basically routes your web browsing through the VPN/proxy server, which has the side effect of making College Board think you are located where the server is. So if you find a VPN server in California, College Board thinks you're in California!</p>
              <p>There are a lot of free VPN apps and public proxies around the internet and mobile app stores. VPNs with a lot of good reviews and expert recommendations are generally safe. Public proxies, however, are usually less safe. Bad VPNs and proxies can still hijack HTTPS connections by installing malicious HTTPS/SSL certificates on your device. This would allow them to steal your passwords and/or install viruses and malware on your computer. <u>Follow standard internet safety practices when downloading these!</u></p>
              <p>How: find a VPN/proxy server located in Northern/Western USA (consult the map below). On your region's scheduled day, connect to the VPN/proxy server (ask the provider for instructions). Then, <a target="_blank" rel="noopener noreferrer" href="https://apscore.collegeboard.org/scores">log into the official website and check your scores</a>. Don't forget to disconnect from the server when you're done!</p>
              <hr>
              <h4 class="is-size-4">The Score Access Website Method</h4>
              <h6 class="is-size-6">The easiest method, but somewhat risky</h6>
              <p>Use an early score access site! However, you should only resort to this method if you can't use any of the other options.</p>
              <p>Of course, entering your password into a third-party website poses a security risk -- what if the website owner steals your password? Being a student myself, I didn't trust other websites either -- so I made one I could trust. If you do not trust this site (or any other site), nobody is forcing you to, and good job maintaining your own sense of security. However, here are a few reassurances about this website:</p>
              <ul>
                <li>Your password is not stored. Your username is not logged. The only thing that happens is your credentials are sent to apscores.org, and your scores are sent back to you. I've detailed the procedure on the <router-link to="/early-scores#how-it-works">How It Works section</router-link></li>
                <li>I've put the code for this site <a target="_blank" rel="noopener noreferrer" href="https://github.com/abalabahaha/apscores">on GitHub</a>. Anyone is free to review the code and see that nothing suspicious is happening.</li>
                <li>This website has your best interests at heart. Many of the other early score websites don't even discuss alternatives and risks -- some of them just have a password field, a little bullshit about security, and no explanation whatsoever. I'm a student too. I've seen people get screwed over by malware from fake VPNs. I've seen people desperately enter their passwords on shady websites without thinking of the potential consequences. This website was made for them.</li>
              </ul>
              <p>How: on July 5th, 8AM ET, come back to this website (<a href="https://apstudents.net/early-scores">https://apstudents.net/early-scores</a>). Log in and check your scores.</p>
            </div>
          </section>
          <hr>
          <section id="score-distributions">
            <h3 class="is-size-3">Score Distributions</h3>
            <p>TotalRegistration.net maintains a <a target="_blank" rel="noopener noreferrer" href="https://www.totalregistration.net/AP-Exam-Registration-Service/2018-AP-Exam-Score-Distributions.php">2018 AP Score Distribution table</a> based on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/ap_trevor">the tweets of Trevor Packer, Senior Vice President of AP at College Board</a>.</p>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import APScoreCountdown from "~/components/APScoreCountdown.vue";
import ScoreReleaseMap from "~/components/ScoreReleaseMap.vue";

export default {
  components: {
    APScoreCountdown,
    ScoreReleaseMap
  },
  head: {
    meta: [
      { hid: 'description', name: 'description', content: '2018 AP Score Release Information! Learn how, when, and where to get your scores this year, and visualize the release schedule with an interactive map!' }
    ],
    title: "2018 AP Score Release Info | AP Students"
  },
  data() {
    return {
      areaList: [
        { id: "US-AL", color: "#7289d0", customData: "July 9, 7AM CT", groupId: "20180709", title: "Alabama" },
        { id: "US-AK", color: "#67b7dc", customData: "July 5, 4AM AKT", groupId: "20180705", title: "Alaska" },
        { id: "US-AZ", color: "#7289d0", customData: "July 9, 6AM MT", groupId: "20180709", title: "Arizona" },
        { id: "US-AR", color: "#7289d0", customData: "July 9, 7AM CT", groupId: "20180709", title: "Arkansas" },
        { id: "US-CA", color: "#67b7dc", customData: "July 5, 5AM PT", groupId: "20180705", title: "California" },
        { id: "US-CO", color: "#7289d0", customData: "July 9, 6AM MT", groupId: "20180709", title: "Colorado" },
        { id: "US-CT", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "Connecticut" },
        { id: "US-DE", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "Delaware" },
        { id: "US-FL", color: "#83c2ba", customData: "July 7, 8AM ET / 7AM CT", groupId: "20180707", title: "Florida" },
        { id: "US-GA", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "Georgia" },
        { id: "US-HI", color: "#67b7dc", customData: "July 5, 2AM HAT", groupId: "20180705", title: "Hawaii" },
        { id: "US-ID", color: "#67b7dc", customData: "July 5, 6AM MT / 5AM PT", groupId: "20180705", title: "Idaho" },
        { id: "US-IL", color: "#7289d0", customData: "July 9, 7AM CT", groupId: "20180709", title: "Illinois" },
        { id: "US-IN", color: "#ebdb8b", customData: "July 6, 8AM ET / 7AM CT", groupId: "20180706", title: "Indiana" },
        { id: "US-IA", color: "#7289d0", customData: "July 9, 7AM CT", groupId: "20180709", title: "Iowa" },
        { id: "US-KS", color: "#7289d0", customData: "July 9, 7AM CT / 6AM MT", groupId: "20180709", title: "Kansas" },
        { id: "US-KY", color: "#db8383", customData: "July 8, 7AM CT / 8AM ET", groupId: "20180708", title: "Kentucky" },
        { id: "US-LA", color: "#7289d0", customData: "July 9, 7AM CT", groupId: "20180709", title: "Louisiana" },
        { id: "US-ME", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "Maine" },
        { id: "US-MD", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "Maryland" },
        { id: "US-MA", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "Massachusetts" },
        { id: "US-MI", color: "#ebdb8b", customData: "July 6, 8AM ET / 7AM CT", groupId: "20180706", title: "Michigan" },
        { id: "US-MN", color: "#67b7dc", customData: "July 5, 7AM CT", groupId: "20180705", title: "Minnesota" },
        { id: "US-MS", color: "#7289d0", customData: "July 9, 7AM CT", groupId: "20180709", title: "Mississippi" },
        { id: "US-MO", color: "#7289d0", customData: "July 9, 7AM CT", groupId: "20180709", title: "Missouri" },
        { id: "US-MT", color: "#67b7dc", customData: "July 5, 6AM MT", groupId: "20180705", title: "Montana" },
        { id: "US-NE", color: "#7289d0", customData: "July 9, 7AM CT / 6AM MT", groupId: "20180709", title: "Nebraska" },
        { id: "US-NV", color: "#7289d0", customData: "July 9, 5AM PT / 6AM MT", groupId: "20180709", title: "Nevada" },
        { id: "US-NH", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "New Hampshire" },
        { id: "US-NJ", color: "#ebdb8b", customData: "July 6, 8AM ET", groupId: "20180706", title: "New Jersey" },
        { id: "US-NM", color: "#7289d0", customData: "July 9, 6AM MT", groupId: "20180709", title: "New Mexico" },
        { id: "US-NY", color: "#ebdb8b", customData: "July 6, 8AM ET", groupId: "20180706", title: "New York" },
        { id: "US-NC", color: "#db8383", customData: "July 8, 8AM ET", groupId: "20180708", title: "North Carolina" },
        { id: "US-ND", color: "#67b7dc", customData: "July 5, 7AM CT / 6AM MT", groupId: "20180705", title: "North Dakota" },
        { id: "US-OH", color: "#ebdb8b", customData: "July 6, 8AM ET", groupId: "20180706", title: "Ohio" },
        { id: "US-OK", color: "#7289d0", customData: "July 9, 7AM CT", groupId: "20180709", title: "Oklahoma" },
        { id: "US-OR", color: "#67b7dc", customData: "July 5, 5AM PT / 6AM MT", groupId: "20180705", title: "Oregon" },
        { id: "US-PA", color: "#ebdb8b", customData: "July 6, 8AM ET", groupId: "20180706", title: "Pennsylvania" },
        { id: "US-RI", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "Rhode Island" },
        { id: "US-SC", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "South Carolina" },
        { id: "US-SD", color: "#67b7dc", customData: "July 5, 7AM CT / 6AM MT", groupId: "20180705", title: "South Dakota" },
        { id: "US-TN", color: "#db8383", customData: "July 8, 7AM CT / 8AM ET", groupId: "20180708", title: "Tennessee" },
        { id: "US-TX", color: "#db8383", customData: "July 8, 7AM CT / 6AM MT", groupId: "20180708", title: "Texas" },
        { id: "US-UT", color: "#7289d0", customData: "July 9, 6AM MT", groupId: "20180709", title: "Utah" },
        { id: "US-VT", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "Vermont" },
        { id: "US-VA", color: "#db8383", customData: "July 8, 8AM ET", groupId: "20180708", title: "Virginia" },
        { id: "US-WA", color: "#67b7dc", customData: "July 5, 5AM PT", groupId: "20180705", title: "Washington" },
        { id: "US-DC", color: "#83c2ba", customData: "July 7, 8AM ET", groupId: "20180707", title: "Washington, DC" },
        { id: "US-WV", color: "#db8383", customData: "July 8, 8AM ET", groupId: "20180708", title: "West Virginia" },
        { id: "US-WI", color: "#ebdb8b", customData: "July 6, 7AM CT", groupId: "20180706", title: "Wisconsin" },
        { id: "US-WY", color: "#7289d0", customData: "July 9, 6AM MT", groupId: "20180709", title: "Wyoming" },
      ]
    };
  }
}
</script>

<style>
@media screen and (min-width: 950px) {
  .sticky-menu {
    /*position: fixed;*/
  }
}
</style>
