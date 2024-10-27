# Search Text in image using Google Gemini FRONTEND

=====================================

### Project Overview

This is a helper software used in searching for a specific keyword in an image using Google Gemini API as the backend service. The need of this software arose when at the hospital and the matron was searching for a the name of a patient from a stash of printed hard copy of patients data. With this software, a simple upload of the a snapshot of the document and keyword search will save time of manual checking of the document to determine if the name is in that document or not.

### Features

- **Home Page**:Brief Explanation explanation of the product.
- **Demo UI**: Upload and query based on desired keyword.

> Docker commands and usage

 <table>
    <tr>
      <th>Task</th>
      <th>Docker commands <a href="https://medium.com/@srijaanaparthy/step-by-step-guide-to-install-docker-on-amazon-linux-machine-in-aws-a690bf44b5fe">set up docker on ec2 instance</a></th>
    </tr>
    <tr>
      <td>Build a docker image using docker compose</td>
      <td>docker-compose build</td>
    </tr>
    <tr>
      <td>Run the image locally</td>
      <td>docker run -d -p 8080:3000 --name text-in-image text-in-image:v1.0.0</td>
    </tr>
    <tr>
      <td>Push Docker image to Dockerhub</td>
      <td>docker tag text-in-image:v1.0.0 adewaleda/text-in-image:v1.0.0</td>
    </tr>
    <tr>
      <td>Push local image to repository</td>
      <td>docker push adewaleda/text-in-image:v1.0.0</td>
    </tr>
    <tr>
      <td>Pull image from DockerHub</td>
      <td>docker pull adewaleda/text-in-image:v1.0.0</td>
    </tr>
    </table>

### [DEMO](https://www.adewaleda.com/npm-packages/adewale-ui-toolbox)
