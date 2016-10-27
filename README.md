# Welcome to KitHub

Graham, Phil, Alex, Matt, Leo, Hannah, Dylan, Mike, David

Uploading and downloading: Kithub uses the ng-file-upload directive to upload photos, lesson plans and additional materials. Photos and additional materials are attached to Rails models using the paperclip gem and stored in AWS. Kithub uses the Pandoc-Ruby gem to convert word document into markdown when a user uploads a lesson and to convert markdown to word documents when a user downloads a lesson.

Contributions Calendar: The contributions calendar uses three custom directives to form the grid. A contributions service populates an index table on the front-end and serves that data to each square in the calendar. For each user, the service calculates the maximum daily contribution value and uses that to construct a color scale that starts at dark green and gets lighter for each quartile, down to gray for 0 contributions.  