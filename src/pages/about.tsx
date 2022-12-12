import ReactMarkdown from 'react-markdown'

export default function AboutPage() {
  return (
    <div className="max-w-none prose mt-5">
      <ReactMarkdown>{aboutMarkDown}</ReactMarkdown>
    </div>
  )
}

var aboutMarkDown = `
### DevOps engineer
***
현재 DevOps 엔지니어로 일하고 있습니다.\n
업무적으로는 AWS, Kubernetes 등 인프라 관련 일을 하고있습니다.\n
개인적으로는 Next.js, Spring boot 등 여러 분야에 관심이 많습니다.

### Tech Stack
***
  - DevOps
    - AWS
    - Kubernetes
    - ArgoCD
    - Jenkins
    - Terraform
  - Backend
    - Spring Boot
  - Frontend
    - Next.js
    - React

### Contact
***
  - Email: [capjjo@gmail.com](mailto:capjjo@gmail.com)
  - Github: [github.com/Jo-Jee](https://github.com/Jo-Jee)
`
