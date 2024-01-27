# Media B API

This is a support service for the webapp UI. It's a Python 3 based on the
[Bottle](https://bottlepy.org/docs/dev/) micro web-framework.

The service periodically grab the standings data from an external API and store them to a database.
The data are stored in a PostgreSQL database and managed via SQLAlchemy.
The background grabber task is executed with APScheduler.


## Execution

```sh
env\Scripts\activate
python main.py --debug

#...

deactivate
```

The application wil be available at `http://localhost:5555`.
Use SERVER_HOST and SERVER_PORT environment variables to customize the URL.


## Prerequisites

Create a *virtualenv* and install dependencies:
```sh
py -m venv env
env\Scripts\activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```


## Directory Layout

```
api/
|-- app/                # source files
|   |-- model.py:       # models and data access layer
|   |-- routes.py:      # web routes
|   '-- task.py:        # background grabber task
|-- config.example.json # sample configuration file
|-- main.py             # main source file
'-- requirements.txt    # dependencies
```
