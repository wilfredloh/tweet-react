let convertTime = (time) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let parsedTime = Date.parse(time);
    parsedTime = new Date(parsedTime);
    return `${parsedTime.getDate()} ${months[parsedTime.getMonth()]}`;
}


class Entities extends React.Component {
    render() {
        let entities = this.props.entities;
        let userMentions = entities.user_mentions.map( (mention, i) => {
          return (
            <div key={i}>
                <p>User Mention: <a>@{mention.screen_name}</a></p>
            </div>
            )
        });
        let urls = entities.urls.map( (url, i) => {
          return (
            <div key={i}>
                <a href ={url.url}> {url.display_url}</a>
           </div>
            )
        });

        return (
          <div>
            {userMentions}
            {urls}
          </div>
        );
    }
}


class User extends React.Component {
    render() {
        let user = this.props.user;

        return (
          <div>
            <h5>{user.name}, @{user.screen_name}</h5>
          </div>
        );
    }
}


class SingleTweet extends React.Component {
    render() {

        let tweet = this.props.tweet;
        let time = convertTime(tweet.created_at);

        let text = tweet.text;
        let textArr = text.split(" ");
        textArr.forEach( word => {
            if (word.includes('http')) {
                textArr.pop();
            }
        })
        text = textArr.join(" ");

        return (
          <div class="tweet-container">
            <p>{time}</p>
            <User user={tweet.user}/>
            <p>{text}</p>
            <Entities entities={tweet.entities}/>
            <hr/>
          </div>
        );
    }
}


class Tweets extends React.Component {
    render() {
        let allTweets = this.props.tweets.map( (tweet, i) => {
          return <SingleTweet tweet={tweet} key={i}></SingleTweet>;
        });

        return (
          <div class="content">
            {allTweets}
          </div>
        );
    }
}


ReactDOM.render(
    <div class="main-container">
        <div class="sidebar">
            <img class="main-logo" src="https://www.belfasttelegraph.co.uk/incoming/article34988814.ece/ALTERNATES/h342/twitter-night.jpg"/>
            <h2>{tweets[0].user.name}</h2>
            <h3>@{tweets[0].user.screen_name}</h3>
        </div>
        <Tweets tweets={tweets}/>
    </div>,
    document.getElementById('root')
);