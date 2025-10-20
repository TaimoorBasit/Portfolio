import { render, screen } from '@testing-library/react'
import { ProjectCard } from '@/components/ProjectCard'

const mockProject = {
  id: '1',
  title: 'Test Project',
  slug: 'test-project',
  description: 'A test project description',
  images: ['https://example.com/image.jpg'],
  videoUrl: 'https://example.com/video.mp4',
  tags: ['React', 'TypeScript'],
  techStack: ['Next.js', 'Tailwind CSS'],
  demoUrl: 'https://demo.example.com',
  repoUrl: 'https://github.com/example/repo',
  featured: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('A test project description')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<ProjectCard project={mockProject} />)
    
    expect(screen.getByText('Demo')).toBeInTheDocument()
    expect(screen.getByText('Code')).toBeInTheDocument()
    expect(screen.getByText('View Details')).toBeInTheDocument()
  })

  it('handles projects without images', () => {
    const projectWithoutImages = { ...mockProject, images: [] }
    render(<ProjectCard project={projectWithoutImages} />)
    
    expect(screen.getByText('No Image')).toBeInTheDocument()
  })
})

