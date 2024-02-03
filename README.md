# Portfolio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# GitHub Pages 👾

This project is configured to work with [GitHub Pages](https://pages.github.com/). 

These are steps I took to create my angular project and get it set up with GitHub Pages. [Click Here](https://madisonbytes.github.io/) to see the result!

### Step 1: Environment Setup

Use the Angular Set Up Guide https://angular.io/guide/setup-local to make sure your environment is set up to create a new project.

### Step 2: Create a Repository

To use GitHub Pages, create a new **Public** repository and name it _username.github.io_.

### Step 3: Clone Repository

In your terminal, navigate to your preferred project location and clone the repository.

```
$ git clone https://github.com/MadisonBytes/MadisonBytes.github.io.git
$ cd MadisonBytes.github.io.git
```

### Step 4: Create Angular Project

Generate new angular project in the current directory. (I also enabled routing to automatically create the app-routing.module, and set my styling preference to scss.)

```
$ ng new portfolio --routing --style=scss --directory ./
```

### Step 5: Update Build Paths

Change the build path of the angular project (GitHub Pages only allows you to choose from your root directory, or a folder called 'docs'). Additionally, you need to set the baseUrl for building.

So in the angular.json file, update **outputPath** and add **baseHref**. Mine looks something like this:

```
{
  "projects": {
      ... 
      "architect": {
        "build": {
          "options": {
            "outputPath": "docs/",
             ...
          },
          "configurations": {
            "production": {
              "baseHref": "https://madisonbytes.github.io/",
              ...
```

You also need to update your Git Repository Settings under `Settings>Pages` 

- Source: Deploy from a branch
- Branch: master
- Folder: /docs

make sure to `Save` your changes.

### Step 6: Build your Project and Push 🚀

Build your project, and push changes to master

```
$ ng build
$ git add .
$ git commit
$ git push
```

And that should be the basic project set up to use GitHub Pages! 😄
