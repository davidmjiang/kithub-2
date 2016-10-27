# Welcome to KitHub

Graham, Phil, Alex, Matt, Leo, Hannah, Dylan, Mike, David

Uploading and downloading: Kithub uses the ng-file-upload directive to upload photos, lesson plans and additional materials. Photos and additional materials are attached to Rails models using the paperclip gem and stored in AWS. Kithub uses the Pandoc-Ruby gem to convert a word document into markdown when a user uploads a lesson and to convert markdown to word documents when a user downloads a lesson. When a user downloads a lesson, the markdown is converted to word, saved as a tempfile and then sent from Rails to the browser for downloading.

![Contributions Calendar](screenshots/contributions_screenshot.tiff "Contributions Calendar")

Contributions Calendar: The contributions calendar uses three custom directives to form the grid. A contributions service populates an index table on the front-end and serves that data to each square in the calendar. For each user, the service calculates the maximum daily contribution value and uses that to construct a color scale that starts at dark green and gets lighter for each quartile, down to gray for 0 contributions.  


# Pull Requests

With Kithub, teachers can collaborate with each other on their lesson plans by submitting Github style "pull requests" to other teacher's lesson plans. By integrating the JS Diff library, we display deletions and additions to both the pull requestor and the pull requestee. The original lesson plan owner then has the option to accept or reject changes to their master copy of the lesson plan. The owner can accept or reject all changes or pick and chose specific portions to accept. Once a user has accepted a pull request to their copy of the lesson plan, those changes are immediatley be reflected in their lesson. Teachers can also comment on pull requests to resolve any issues or uncertainties. Collaborating on lesson plans has never been easier!


