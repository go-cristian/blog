# CODE CHALLENGE SOLUTION

### Matter Supply / Outpost Industries

### Frontend Technologist

## Notes

The challenge was developed using ReactJS, Redux, Webpack, and Typescript. The total amount of time for this challenge was approximately 24 hours.

## Know issues

- UI is still very different from the designs.
- Login token is hardcoded (shame).
- When going home is still persisting the last search.
- When going directly to a gist detail it crashes.
- No session persistence.
- In production routes are not working as expected, it can be something with firebase.
- No CI implemented.
- No tests.

## Challenge

The challenge at this moment is practically done there are some issues and UI improvements that surely I wanted to do.

## Requirements

### Markup/UI implementation

Feel quite fine about this if testing on Chrome, away from that not sure how it works.

## Completeness

### As a reader (not logged user)

- As a reader, I want to be able to see a list of blog posts that a writer has posted on Github in the form of Gists. (Completed)
- As a reader, I want to be able to select a post on the index page and see the post details, it must be presented in HTML if Gist was a Markdown file. (Completed)
- As a reader, I want to be able to navigate from a post to the next post so that I can read the next post. (Completed with issues)
- As a reader, I want to be able to navigate back to the index page from a post so that I can select a different post to read. (Completed)

### As a writer (logged in user)

- As a writer, I want to be able to post a Gist to Github and have that post show up on my blog so that a reader can read the new post. (Completed)
- As a writer, I want to be able to make updates to a post by updating the Gist, so that I can correct typos and make content updates. (Not Completed)

## Questions/Answers

- What are your thoughts around continuous integration, where & how you would deploy this application?
  This application is deployed on Firebase, the ability to continue going to production without fear is a big step into any development process. This guarantees that the service can be integrated easily with any change that was made by the team. It's important to clarify this at the beginning of every project, giving the ability to make changes and see everything working "away from my machine".
- What do you think you would do differently if you had 2 weeks to complete this assignment and no requirement to use Github. What would your backend solution look like?
  Github is a good option for this, What I don't like is the OAuth interface we need to implement for this, something easier with a user/password would be good, but trying to grant all the security and deployment done by GitHub in 2 weeks probably is not the best solution. The third party is Ok in most of the cases for me. Surely if I have 2 weeks full for this challenge I really wanted to invert on tests processes and the auto-deployment. Also on investigating other architectures.
- How and where do you feel like this application should be deployed to?
  Right now firebase is good for me, I can use a single application command to upload everything.
- Are you happy with your own solutions? If yes, what parts do you think are really well done, if not, what would you want to change?
  No, this was my first project using Typescript from zero and it was a big challenge to understand the types that React & Redux are using in some moments when connecting the UI to the events. The cool stuff is that I can build the app and if it passes I can barely know that at least is shippable and I can deploy it.

## Delivery

You can see this shit running locally by doing `npm run start` or you can go to `https://blog-29a6b.firebaseapp.com`.

## Thanks

Thanks in advance for every comment. Please don't look so much at the "actions", that part is garbage, see how Promises are a complete nightmare to understand.
