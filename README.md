
# Cat-Share: Cat Owner App

Thise app aims to allow Cat Owners to have a Hub of all of their cat's important information, as well as set and fire reminders set by users. This app was created for my __Front End Capstone at NSS__.

Skills used in CatShare:
```
- Entity Relationship Diagram to display the relationships between database entities
- Javscript
- React
```

# Steps to testing Cat-Share Locally:

### 1 - Cloning the repo down:
- Click the ```Code``` button and copy the SSH link, and then run ```git clone <the-ssh link>``` in your terminal

### 2 - Installing dependencies and running CatShare
- ```cd <repo-name>``` to open the repo in the terminal (you can run ```ls``` to find the repo name if you're unable to find it)
- In the base repo, run ```npm install``` to install the React and Font Awesome Dependencies
- In the base repo, run ```npm run dev``` to get the client side to run, it will return ```Local: http://localhost:<port-number> ```, copy and paste this into the browser.
- Run ```cd``` into the api folder inside the repo
- Run ```json-server --watch database.json --port 8088``` in the api folder to start the JSON server on port 8088 (All the fetch requests have been configured to port 8088)

# CatShare should now be running in the browser!


