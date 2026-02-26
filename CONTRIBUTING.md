# Contributing to AlgoMentor

First off, thank you for considering contributing to AlgoMentor! It's people like you that make AlgoMentor such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed and what behavior you expected**
* **Include screenshots if possible**
* **Include your environment details** (OS, Java version, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List some examples of how it would be used**

### Pull Requests

* Fill in the required template
* Follow the coding style guidelines
* Include appropriate test cases
* Update documentation as needed
* End all files with a newline

## Development Setup

### Prerequisites

- Java 17+
- Maven 3.6+
- Node.js 16+
- Docker (optional)
- PostgreSQL 14+ (for production testing)

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AlgoMentor.git
   cd AlgoMentor
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Set up backend**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Set up frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

5. **Make your changes**
   - Write your code
   - Add tests
   - Update documentation

6. **Test your changes**
   ```bash
   # Backend tests
   mvn test
   
   # Frontend tests
   cd frontend
   npm test
   ```

7. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

8. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Create a Pull Request**

## Coding Style

### Backend (Java)

- Follow [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
- Use meaningful variable and method names
- Add JavaDoc comments for public methods
- Keep methods small and focused
- Use dependency injection
- Write unit tests for new code

Example:
```java
/**
 * Retrieves a student by their ID.
 *
 * @param id the student ID
 * @return the student entity
 * @throws ResourceNotFoundException if student not found
 */
public Student getStudentById(Long id) {
    return studentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
}
```

### Frontend (React)

- Use functional components with hooks
- Follow [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- Use meaningful component and variable names
- Keep components small and focused
- Add PropTypes or TypeScript types
- Write tests for components

Example:
```javascript
/**
 * StudentCard component displays student information
 */
const StudentCard = ({ student, onEdit, onDelete }) => {
  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <p>{student.email}</p>
      <button onClick={() => onEdit(student)}>Edit</button>
      <button onClick={() => onDelete(student.id)}>Delete</button>
    </div>
  );
};
```

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```
feat(auth): add password reset functionality

Implement password reset via email with secure token generation.
Tokens expire after 1 hour.

Closes #123
```

```
fix(api): resolve CORS issue in production

Update CORS configuration to allow specific origins instead of wildcards.

Fixes #456
```

## Testing Guidelines

### Backend Tests

```java
@Test
public void testGetStudentById_Success() {
    // Arrange
    Student student = new Student("John Doe", "john@example.com");
    when(studentRepository.findById(1L)).thenReturn(Optional.of(student));
    
    // Act
    Student result = studentService.getStudentById(1L);
    
    // Assert
    assertEquals("John Doe", result.getName());
    verify(studentRepository, times(1)).findById(1L);
}
```

### Frontend Tests

```javascript
test('renders student name', () => {
  const student = { id: 1, name: 'John Doe', email: 'john@example.com' };
  render(<StudentCard student={student} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

## Documentation

- Update README.md if you change functionality
- Add JSDoc/JavaDoc comments for new functions/methods
- Update API documentation if you add/modify endpoints
- Add examples for new features

## Pull Request Process

1. **Ensure all tests pass**
   ```bash
   mvn test
   cd frontend && npm test
   ```

2. **Update documentation**
   - README.md
   - API documentation
   - Code comments

3. **Follow the PR template**
   - Describe your changes
   - Link related issues
   - Add screenshots if applicable

4. **Request review**
   - Tag relevant maintainers
   - Respond to feedback promptly

5. **Merge requirements**
   - All tests must pass
   - At least one approval from maintainer
   - No merge conflicts
   - Documentation updated

## Project Structure

```
AlgoMentor/
├── src/main/java/com/algomentor/
│   ├── config/          # Configuration classes
│   ├── controller/      # REST controllers
│   ├── service/         # Business logic
│   ├── repository/      # Data access
│   ├── dto/             # Data transfer objects
│   ├── model/           # JPA entities
│   ├── security/        # Security & JWT
│   ├── exception/       # Exception handling
│   └── util/            # Utilities
├── src/main/resources/
│   ├── db/migration/    # Flyway migrations
│   └── application*.properties
├── frontend/src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   └── utils/           # Utilities
└── docs/                # Documentation
```

## Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and discussions
- **Email**: support@algomentor.com

## Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AlgoMentor! 🎉
