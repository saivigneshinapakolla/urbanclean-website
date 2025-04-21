# Urban Clean Website

A contact form website with Node.js backend and MySQL database.

## CI/CD Setup with Jenkins and GitHub

### Prerequisites
1. Jenkins server installed and running
2. Docker installed on Jenkins server
3. Docker Compose installed on Jenkins server
4. Node.js installed on Jenkins server
5. GitHub repository set up
6. GitHub Personal Access Token (PAT) created

### GitHub Setup

1. **Create GitHub Personal Access Token**
   - Go to GitHub Settings > Developer Settings > Personal Access Tokens
   - Generate a new token with the following scopes:
     - `repo` (full control of private repositories)
     - `admin:repo_hook` (manage repository hooks)
     - `admin:org_hook` (manage organization hooks)
   - Username: saivigneshinapakolla
   - Password: Vignesh@9#

2. **Configure GitHub Webhook**
   - Go to your repository settings
   - Navigate to Webhooks > Add webhook
   - Set Payload URL to: `https://your-jenkins-url/github-webhook/`
   - Set Content type to: `application/json`
   - Select events: `Push` and `Pull Request`
   - Save the webhook

### Jenkins Setup Steps

1. **Install Required Jenkins Plugins**
   - Docker Pipeline
   - Git
   - Pipeline
   - Docker
   - Docker Compose
   - GitHub Integration
   - GitHub Branch Source
   - GitHub Authentication

2. **Configure GitHub Credentials in Jenkins**
   - Go to Jenkins > Credentials > System > Global credentials
   - Add new credentials:
     - Kind: Username with password
     - Username: saivigneshinapakolla
     - Password: Vignesh@9#
     - ID: github-credentials

3. **Configure Docker Credentials in Jenkins**
   - Go to Jenkins > Credentials > System > Global credentials
   - Add new credentials:
     - Kind: Username with password
     - Username: inapakollavignesh
     - Password: Vignesh@9#
     - ID: docker-credentials

4. **Configure GitHub Server in Jenkins**
   - Go to Jenkins > Manage Jenkins > Configure System
   - Under GitHub section:
     - Add GitHub Server
     - Set API URL: https://api.github.com
     - Add credentials (use github-credentials)
     - Test connection

5. **Create a New Pipeline Job**
   - Go to Jenkins > New Item
   - Enter a name for your job
   - Select "Pipeline" as the job type
   - Click OK

6. **Configure the Pipeline**
   - In the job configuration:
     - Select "Pipeline script from SCM"
     - Choose "Git" as SCM
     - Enter repository URL: https://github.com/saivigneshinapakolla/urbanclean-website.git
     - Set the branch to build (e.g., main/master)
     - Set the script path to "Jenkinsfile"
     - Save the configuration

### Pipeline Stages

The pipeline includes the following stages:
1. **Checkout**: Clones the GitHub repository
2. **Install Dependencies**: Installs Node.js dependencies
3. **Test**: Runs tests and reports results to GitHub
4. **Build Docker Image**: Builds the Docker image
5. **Push Docker Image**: Pushes the image to Docker Hub (inapakollavignesh)
6. **Deploy**: Deploys the application using Docker Compose

### GitHub Integration Features

1. **Automatic Builds**
   - Pipeline triggers automatically on:
     - Push to main branch
     - Pull request creation/update
     - Manual trigger from Jenkins

2. **Status Checks**
   - Build status is reported back to GitHub
   - Pull requests show build status
   - Branch protection can require successful builds

3. **Test Results**
   - Test results are posted to GitHub
   - Failed tests are visible in pull requests

### Environment Variables

Make sure the following environment variables are set in your Jenkins environment:
- `MYSQL_HOST`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`
- `GITHUB_CREDENTIALS=github-credentials`
- `DOCKER_CREDENTIALS=docker-credentials`

### Troubleshooting

If you encounter issues:
1. Check Jenkins logs for error messages
2. Verify GitHub webhook delivery status
3. Ensure GitHub credentials are correctly configured
4. Check network connectivity between Jenkins and GitHub
5. Verify all required plugins are installed
6. Ensure Docker and Docker Compose are properly installed
7. Check GitHub Personal Access Token permissions
8. Verify Docker Hub credentials are working 