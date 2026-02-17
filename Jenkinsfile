pipeline {
    agent any

    environment {
        DOCKER_USER = "omryakawar"
        FRONTEND_IMAGE = "${DOCKER_USER}/cloudops-frontend"
        BACKEND_IMAGE = "${DOCKER_USER}/cloudops-backend"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/omryakawar03/cloudops-platform.git'
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo "frontend"
                sh """
                docker build -t $FRONTEND_IMAGE:$IMAGE_TAG ./frontend
                """
            }
        }

        stage('Build Backend Image') {
            steps {
                sh """
                docker build -t $BACKEND_IMAGE:$IMAGE_TAG ./backend
                """
            }
        }

        stage('Trivy Scan') {
            steps {
                sh """
                trivy image $FRONTEND_IMAGE:$IMAGE_TAG || true
                trivy image $BACKEND_IMAGE:$IMAGE_TAG || true
                """
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh """
                    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                    """
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """
                docker push $FRONTEND_IMAGE:$IMAGE_TAG
                docker push $BACKEND_IMAGE:$IMAGE_TAG
                """
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh """
                kubectl set image deployment/frontend frontend=$FRONTEND_IMAGE:$IMAGE_TAG -n cloudops
                kubectl set image deployment/backend backend=$BACKEND_IMAGE:$IMAGE_TAG -n cloudops
                """
            }
        }

        stage('Verify Rollout') {
            steps {
                sh """
                kubectl rollout status deployment/frontend -n cloudops
                kubectl rollout status deployment/backend -n cloudops
                """
            }
        }
    }
}
