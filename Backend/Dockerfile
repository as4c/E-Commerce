FROM python:3.10 

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /opt/app

RUN pip install --upgrade pip
# Copy the requirements file into the container
COPY ./requirements.txt /opt/app

# Install the required packages
RUN pip install -r requirements.txt

# Copy the Django backend files into the container
COPY . /opt/app 

# Expose port 8000 for the Django server
EXPOSE 8000

# Run the Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]