---
title: 'The Command Line: Introduction'
feature_image_file: markus-spiske-221494-min.jpg
highlight:
    enabled: true
    lines: true
    theme: monokai
taxonomy:
    tag: [command line interface]
---

People often ask me for tips and tricks on how to increase the speed of their workflow. And it always amazes me how many developers simply avoid using one the most powerful tool that is the command line. In this blog post we will discuss what is the command line and how developers can improve their workflow by using the command line.

---

A command line is a type of user interface that relies on text rather than graphical elements. The communication between the user (human) and the computer is therefore done through text or as we call it, commands. These commands have the power to quickly execute tasks that would be tedious to execute through a Graphical User Interface. A fit example could be someone trying to delete all the files containing a certain word in their filename in a specific directory.


*NOTE: This is the first article in a series that will give some tips and tricks to become much faster using the command line.*

## The different types of command line 
Most operating systems come with what we call a shell which is a user interface allowing communication with the operating system itself. It generally comes in two flavors: Command Line Interface (CLI) and Graphical USer Interface (GUI). On Windows, for instance, there is the Windows shell which allows its users to perform tasks graphically like clicking on files or launching programs using a mouse. 


When we talk about CLI we are referring to a shell that allows communication through text commands.


Windows comes with the **COMMAND.COM shell** (often referred as Windows Command prompt) and Powershell out of the box. **Powershell** is a newer shell (available since Windows 7) and as its name implies, it is much more powerful than the Windows Command prompt.


Most Unix based systems like Mac OS or Linux usually have the **Bourne-Again shell (bash)** pre installed.


I always recommend people to learn bash first as it is one the most widely used shell by developers. It is possible to use it on Windows using the cygwin project or simply by having git installed.

### Terminal
Often people will refer to the use of a command line interface as the terminal. The terminal emulator or simply terminal is the graphical window that allows one to enter commands to be processed by a shell. Some terminal emulators offer more features than others. My personal preferences are **ConEmu** on Windows and **Guake** on Linux. On Mac OS I heard that **iTerm2** is a very good option.

## The basics of bash commands
The bash shell has what we call a **prompt** which ... prompts you to write commands. A prompt usually looks like this:

```sh
~/Documents/
[18:00:07] joe@awesome-machine $ 
```

When writing a command it will appear at the end of the prompt like so:

```bash
~/Documents/
[18:00:07] joe@awesome-machine $ commands go here
```

Command anatomy
A command has the following form:

```bash
mkdir -p docs
```

Where:
1. **mkdir**: is the command we want to execute
2. **-p**: is an option we are giving to the command that will change the behaviour of the command. Most commands usually come with a series of options available to alter their behaviour.
3. **docs**: the argument we are passing to the command. Some commands require an argument in order for them to work. For example, the mkdir command allows one to create a directory where the argument is the name of the directory we want to create.
________________
### Useful commands
Here is a list of basic commands. I strongly recommend getting familiar with these commands as they are essential to a productive use of bash.


- **ls**: (LiSt) Displays the content of a directory.
- **mkdir**: (MaKe DIRectory) Creates a directory of the specified name:
   - mkdir docs : creates a directory named docs.
- **cat**: Displays the content of a file. Useful for text files.
- **cd**: Change Directory. Changes the current working directory to a certain new location. If no directory is specified as argument, will change the current working directory to the *home directory* (~/).
- **pwd**: displays the current working directory
- **touch**: Can be used to create a new blank file. (Though it has other uses I won’t cover here).
- **less**: Displays the content of a file, but unlike cat allows to view it page by page instead of being dumped on the screen.
- **head/tail**: Displays the first/ last 10 lines of a file.
- **rm**: ReMove, PERMANENTLY removes a specified file. (It won’t go in the recycle bin) 
- **rmdir**: Removes a directory
- **cp**: CoPy. Copies a specified file to a new file with a certain name.
   - cp hello.png byebye.png : will create a copy of hello.png named byebye.png
- **mv**: Moves a file in a new location. it can also be used to rename a file if the location is the same.
- **history**: Displays a list of all the commands that were entered by the user in the prompt sequentially

Note: the --help option is available for almost all commands and gives a detailed explanation of a command's behaviour and available options.  
E.g.: 
    - ls --help
    - mkdir --help
    - etc.

### Location
When using the command line there is always the concept of location. This concept is represented by the current working directory which indicates the directory the shell is currently working in. For example, if the current working directory (which can be known using the pwd command, or by looking at the prompt) is ~/documents/music and someone was to issue the following command:
mkdir rolling_stones
The directory rolling_stones would be created in the music directory like so:

```bash
~/documents/music/rolling_stones
```

### Chaining commands
Bash offers the possibility to chain commands together. This means writing more than one command in the prompt thus executing multiple commands sequentially. Let's say we wanted to create a directory called src with a file named Token.java in it. Instead of doing this:

```bash
[18:55:25] Home@Home-PC MINGW32 /h/MyProject/ $ mkdir src
[18:55:27] Home@Home-PC MINGW32 /h/MyProject/ $ touch src/Token.java
```

we could simply do this:

```bash
[18:55:27] Home@Home-PC MINGW32 /h/MyProject/ $ mkdir src; touch src/Token.java
```


This can become quite useful when we have multiple commands we want to chain that may take some time.

There are two ways to chain commands:
- Using the semicolon: ```mkdir src; touch src/Token.java```
- Using the double ampersand: ```mkdir src && touch src/Token.java```


The difference between the semicolon and the double ampersand is this:  
When we use the double ampersand the second command will only be executed if the first one was executed successfully. 
When we use the semicolon both commands will be executed one after the other.

In our previous case It would be more appropriate to use the ```&&``` since we only want to create the *Token.java* file
if the directory *src* exists. If this fails it becomes useless to create the *Token.java* file

## Scripts
Sometimes we might want to reuse multiple chained commands over and over again. Instead of having to type them every time they are needed, we can save them 
to a file to be executed. This type of file is called a bash script and it is very useful to automate certain tasks.

Here are a few examples of useful scripts one might want to use:

- Making backup of files automatically
- Getting the current weather from the terminal
- Transfer files to a server
- Organise pictures in folders by date
- Execute post-processing tasks on newly committed code
- Install programs on a fresh OS install
- Execute startup config
- Download newest data
- Compile a new version of a program every night
- etc.

To create a script execute the following command:

```bash
[18:55:25] Home@Home-PC MINGW32 /h/home/ $ touch nameOfScript.sh
```

And edit it with your text editor of choice with the commands you want.

Bash being a scripting language as well offers some interesting functionality like:
- Control flows (if-then-else)
- Loops (for, do while)
- Variables 
- etc.

## Conclusion
In conclusion, the command line is an awesome tool that can help anyone increase the speed of their workflow by providing shortcuts and tools to help automate daily tasks. In the next few posts we will cover some of the most useful and powerful aliases, scripts as swell as some little tips and tricks to customize your terminal.
Please ... use the command line ...