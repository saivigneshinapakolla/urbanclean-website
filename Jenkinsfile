pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'urbanclean-website'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = 'docker.io/inapakollavignesh'
        GITHUB_CREDENTIALS = 'github-credentials'
        DOCKER_CREDENTIALS = 'docker-credentials'
    }

    triggers {
        // GitHub webhook trigger
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        credentialsId: "${GITHUB_CREDENTIALS}",
                        url: 'https://github.com/saivigneshinapakolla/urbanclean-website.git'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
                // Post test results to GitHub
                junit 'test-results.xml'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS}") {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker-compose down
                    docker-compose pull
                    docker-compose up -d
                '''
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            // Update GitHub status
            updateGitHubCommitStatus(
                state: 'SUCCESS',
                context: 'Jenkins CI/CD Pipeline'
            )
            echo 'Pipeline completed successfully!'
        }
        failure {
            // Update GitHub status
            updateGitHubCommitStatus(
                state: 'FAILURE',
                context: 'Jenkins CI/CD Pipeline'
            )
            echo 'Pipeline failed!'
        }
    }
} 