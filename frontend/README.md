https://gist.github.com/claraj/e5563befe6c2fb108ad0efb6de47f265



The below steps can be followed to override the existing user setting:

Menu Code → Preference → Setting
Search for files.exclude
Mouse over files.exclude property, click on the edit icon and then opt for the copy to settings.
The above steps will add all the properties, but keep only those which need to be overridden. For this case: it should be, "files.exclude": { "**/.git": false }
Close the user setting. the .git folder will automatically appear in the respective repository.



or just remove the git part.
