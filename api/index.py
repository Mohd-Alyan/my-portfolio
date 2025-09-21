from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    portfolio_data = {
        'name': 'Mohd Alyan',
        'title': 'Aspiring DevOps Engineer',
        'email': 'mohd.alyan18@gmail.com',
        'github': 'https://github.com/Mohd-Alyan',
        'linkedin': 'https://www.linkedin.com/in/mohd-alyan/',
        'about': '''I am a passionate B.Tech Computer Science Engineering student with a keen interest in DevOps, 
                   automation, and cloud technologies. I enjoy building scalable solutions and learning new technologies 
                   that bridge the gap between development and operations. Currently focused on mastering Python, 
                   containerization, and CI/CD pipelines.''',
        'technologies': [
            {'name': 'Python', 'level': 80, 'icon': '🐍'},
            {'name': 'Docker', 'level': 20, 'icon': '🐳'},
            {'name': 'Git/GitHub', 'level': 85, 'icon': '📚'},
            {'name': 'Linux', 'level': 75, 'icon': '🐧'},
            {'name': 'AWS', 'level': 0, 'icon': '☁️'},
            {'name': 'Jenkins', 'level': 0, 'icon': '🔧'},
            {'name': 'Kubernetes', 'level': 0, 'icon': '⚙️'},
            {'name': 'Flask', 'level': 70, 'icon': '🌶️'}
        ],
        'projects': [
            {
                'title': 'A Browser Based Image to PDF Converter',
                'description': 'Built a Browser Based Image to PDF Converter that is Super fast and runs directly in the Browser.',
                'technologies': ['Html', 'CSS', 'Git', 'JavaScript'],
                'github': 'https://github.com/Mohd-Alyan/img-to-pdf-'
            },
            {
                'title': 'Passlocker - A Password encryptor/Decrypter',
                'description': 'Built a Browser Based Password Encryptor/Decryptor that uses RAS Encryption system to encrytp the text and returs the cypher and key text file which the user can use to decrypt.',
                'technologies': ['Python','Flask','Html', 'CSS', 'Git', 'JavaScript'],
                'github': 'https://github.com/Mohd-Alyan/passlocker'
            },
        ],
        'education': {
            'degree': 'Pursuing Bachelor of Technology in Computer Science Engineering',
            'university': 'Allenhouse Institute of Technology',
            'year': '2025 - 2029',
            'cgpa': 'To be updated',
            'relevant_courses': [
                'Data Structures & Algorithms',
                'Database Systems',
                'Computer Networks',
                'Operating Systems',
                'Software Engineering'
            ]
        }
    }
    return render_template('index.html', data=portfolio_data)

if __name__ == '__main__':
    app.run()
    
