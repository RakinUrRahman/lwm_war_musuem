// Education Page Functionality
let learningPaths = [];
let courses = [];
let userProgress = {
    completedLessons: [],
    quizScores: [],
    currentPath: null,
    totalLessons: 0
};

// Initialize education page
function initializeEducation() {
    loadEducationData();
    renderLearningPaths();
    renderCourses();
    renderSidebar();
    setupFilters();
    setupTabs();
    updateEducationStats();
    loadUserProgress();
}

// Load education data
function loadEducationData() {
    learningPaths = generateLearningPaths();
    courses = generateCourses();
}

// Generate learning paths
function generateLearningPaths() {
    return [
        {
            id: 1,
            title: 'Beginner Explorer',
            description: 'Start your journey into Bangladesh\'s Liberation War history with foundational knowledge and key events.',
            level: 'beginner',
            icon: 'fa-seedling',
            lessons: 12,
            duration: '6 hours',
            students: 2543,
            courses: ['basic-history', 'key-figures', 'timeline-intro']
        },
        {
            id: 2,
            title: 'Historical Scholar',
            description: 'Dive deeper into detailed analysis, political context, and socio-economic factors of the Liberation War.',
            level: 'intermediate',
            icon: 'fa-book-open',
            lessons: 18,
            duration: '12 hours',
            students: 1876,
            courses: ['political-context', 'social-impact', 'military-strategy']
        },
        {
            id: 3,
            title: 'Research Specialist',
            description: 'Advanced research methods, primary sources analysis, and comprehensive understanding of the liberation movement.',
            level: 'advanced',
            icon: 'fa-microscope',
            lessons: 24,
            duration: '20 hours',
            students: 892,
            courses: ['research-methods', 'primary-sources', 'analytical-studies']
        },
        {
            id: 4,
            title: 'Educator Track',
            description: 'Learn how to teach Liberation War history effectively, with pedagogical approaches and teaching resources.',
            level: 'intermediate',
            icon: 'fa-chalkboard-teacher',
            lessons: 15,
            duration: '10 hours',
            students: 654,
            courses: ['teaching-methods', 'curriculum-design', 'student-engagement']
        }
    ];
}

// Generate courses
function generateCourses() {
    return {
        interactive: [
            {
                id: 'interactive-1',
                title: 'Interactive Timeline of Liberation War',
                description: 'Explore the chronological events of 1971 through an interactive timeline with multimedia content.',
                level: 'beginner',
                duration: '45 min',
                lessons: 8,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=101',
                type: 'interactive'
            },
            {
                id: 'interactive-2',
                title: 'Virtual Battle Simulations',
                description: 'Experience key battles through interactive simulations and strategic analysis.',
                level: 'intermediate',
                duration: '1.5 hours',
                lessons: 12,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=102',
                type: 'interactive'
            },
            {
                id: 'interactive-3',
                title: 'Freedom Fighters Profile Explorer',
                description: 'Interactive profiles of key freedom fighters with their stories and contributions.',
                level: 'beginner',
                duration: '1 hour',
                lessons: 10,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=103',
                type: 'interactive'
            },
            {
                id: 'interactive-4',
                title: 'Political Context Analyzer',
                description: 'Interactive tool to understand the political landscape before and during the war.',
                level: 'advanced',
                duration: '2 hours',
                lessons: 15,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=104',
                type: 'interactive'
            }
        ],
        video: [
            {
                id: 'video-1',
                title: 'Liberation War Documentary Series',
                description: 'Comprehensive video documentary covering all aspects of the Liberation War.',
                level: 'intermediate',
                duration: '3 hours',
                lessons: 20,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=201',
                type: 'video'
            },
            {
                id: 'video-2',
                title: 'Veteran Testimonials',
                description: 'First-hand accounts from freedom fighters and war veterans.',
                level: 'beginner',
                duration: '2 hours',
                lessons: 15,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=202',
                type: 'video'
            },
            {
                id: 'video-3',
                title: 'Historical Analysis Lectures',
                description: 'Expert lectures on the historical significance and impact of the Liberation War.',
                level: 'advanced',
                duration: '4 hours',
                lessons: 25,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=203',
                type: 'video'
            },
            {
                id: 'video-4',
                title: 'Cultural Impact Studies',
                description: 'How the Liberation War influenced Bangladesh\'s culture, art, and literature.',
                level: 'intermediate',
                duration: '1.5 hours',
                lessons: 12,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=204',
                type: 'video'
            }
        ],
        reading: [
            {
                id: 'reading-1',
                title: 'Primary Source Documents',
                description: 'Collection of historical documents, letters, and official papers from 1971.',
                level: 'advanced',
                duration: '3 hours',
                lessons: 18,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=301',
                type: 'reading'
            },
            {
                id: 'reading-2',
                title: 'Historical Accounts and Memoirs',
                description: 'Personal accounts and memoirs from participants in the Liberation War.',
                level: 'intermediate',
                duration: '2.5 hours',
                lessons: 16,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=302',
                type: 'reading'
            },
            {
                id: 'reading-3',
                title: 'Liberation War Literature',
                description: 'Poems, stories, and literary works inspired by the Liberation War.',
                level: 'beginner',
                duration: '2 hours',
                lessons: 14,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=303',
                type: 'reading'
            },
            {
                id: 'reading-4',
                title: 'Research Papers and Studies',
                description: 'Academic research and scholarly articles on various aspects of the war.',
                level: 'advanced',
                duration: '4 hours',
                lessons: 22,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=304',
                type: 'reading'
            }
        ],
        quiz: [
            {
                id: 'quiz-1',
                title: 'Liberation War Basics Quiz',
                description: 'Test your knowledge of basic facts and events of the Liberation War.',
                level: 'beginner',
                duration: '20 min',
                lessons: 25,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=401',
                type: 'quiz'
            },
            {
                id: 'quiz-2',
                title: 'Key Figures Assessment',
                description: 'Quiz about important personalities and their roles in the Liberation War.',
                level: 'intermediate',
                duration: '30 min',
                lessons: 30,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=402',
                type: 'quiz'
            },
            {
                id: 'quiz-3',
                title: 'Timeline and Chronology Test',
                description: 'Comprehensive test on the chronological order of events during 1971.',
                level: 'intermediate',
                duration: '25 min',
                lessons: 35,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=403',
                type: 'quiz'
            },
            {
                id: 'quiz-4',
                title: 'Advanced Analysis Exam',
                description: 'In-depth examination of political, social, and military aspects of the war.',
                level: 'advanced',
                duration: '45 min',
                lessons: 40,
                completed: 0,
                thumbnail: 'https://picsum.photos/400/200?random=404',
                type: 'quiz'
            }
        ]
    };
}

// Render learning paths
function renderLearningPaths() {
    const container = document.getElementById('learningPaths');
    
    container.innerHTML = learningPaths.map(path => `
        <div class="col-lg-6 col-xl-3 mb-4">
            <div class="learning-path-card" onclick="selectLearningPath(${path.id})">
                <div class="path-icon">
                    <i class="fas ${path.icon}"></i>
                </div>
                <h4 class="path-title">${path.title}</h4>
                <p class="path-description">${path.description}</p>
                <div class="path-stats">
                    <div class="path-stat">
                        <div class="path-stat-value">${path.lessons}</div>
                        <div class="path-stat-label">Lessons</div>
                    </div>
                    <div class="path-stat">
                        <div class="path-stat-value">${path.duration}</div>
                        <div class="path-stat-label">Duration</div>
                    </div>
                </div>
                <div class="mt-3">
                    <span class="path-level ${path.level}">${path.level}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Select learning path
function selectLearningPath(pathId) {
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return;
    
    userProgress.currentPath = pathId;
    saveUserProgress();
    
    alert(`You've selected the "${path.title}" learning path! Your progress will be tracked accordingly.`);
    updateSidebar();
}

// Render courses
function renderCourses() {
    Object.keys(courses).forEach(type => {
        renderCourseType(type, courses[type]);
    });
}

// Render course type
function renderCourseType(type, courseList) {
    const containerId = type === 'interactive' ? 'interactiveLessons' :
                       type === 'video' ? 'videoCourses' :
                       type === 'reading' ? 'readingMaterials' : 'quizzes';
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = courseList.map(course => `
        <div class="course-card" onclick="openCourse('${course.id}')">
            <div class="course-thumbnail">
                <img src="${course.thumbnail}" alt="${course.title}" loading="lazy">
                <div class="course-duration">${course.duration}</div>
                <div class="course-level-badge ${course.level}">${course.level}</div>
            </div>
            <div class="course-content">
                <h6 class="course-title">${course.title}</h6>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span><i class="fas fa-book-reader me-1"></i>${course.lessons} ${course.type === 'quiz' ? 'Questions' : 'Lessons'}</span>
                    <span><i class="fas fa-clock me-1"></i>${course.duration}</span>
                </div>
                <div class="course-progress">
                    <div class="course-progress-label">
                        <span>Progress</span>
                        <span>${Math.round((course.completed / course.lessons) * 100)}%</span>
                    </div>
                    <div class="course-progress-bar">
                        <div class="course-progress-fill" style="width: ${(course.completed / course.lessons) * 100}%"></div>
                    </div>
                </div>
                <div class="course-actions">
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); startCourse('${course.id}')">
                        ${course.completed > 0 ? 'Continue' : 'Start'} ${course.type === 'quiz' ? 'Quiz' : 'Course'}
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="event.stopPropagation(); previewCourse('${course.id}')">
                        Preview
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open course
function openCourse(courseId) {
    const course = findCourseById(courseId);
    if (!course) return;
    
    const modal = new bootstrap.Modal(document.getElementById('courseModal'));
    const title = document.getElementById('courseModalTitle');
    const body = document.getElementById('courseModalBody');
    
    title.textContent = course.title;
    
    body.innerHTML = `
        <div class="course-modal-content">
            <div class="row">
                <div class="col-md-8">
                    <img src="${course.thumbnail}" alt="${course.title}" class="img-fluid rounded mb-3">
                    <h5>Course Overview</h5>
                    <p>${course.description}</p>
                    
                    <h6>What You'll Learn</h6>
                    <ul class="list-unstyled">
                        ${generateLearningObjectives(course.type).map(obj => `
                            <li class="mb-2"><i class="fas fa-check text-success me-2"></i>${obj}</li>
                        `).join('')}
                    </ul>
                    
                    <h6>Course Structure</h6>
                    <div class="course-structure">
                        ${generateCourseStructure(course).map((lesson, index) => `
                            <div class="lesson-item d-flex align-items-center p-2 mb-2 bg-light rounded">
                                <div class="lesson-number me-3">
                                    <span class="badge ${index < course.completed ? 'bg-success' : 'bg-secondary'}">${index + 1}</span>
                                </div>
                                <div class="lesson-info flex-grow-1">
                                    <div class="lesson-title fw-medium">${lesson.title}</div>
                                    <div class="lesson-duration text-muted small">${lesson.duration}</div>
                                </div>
                                ${index < course.completed ? '<i class="fas fa-check-circle text-success"></i>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="course-info-sidebar">
                        <div class="info-item mb-3">
                            <strong>Level:</strong>
                            <span class="badge bg-${course.level === 'beginner' ? 'success' : course.level === 'intermediate' ? 'warning' : 'danger'} ms-2">
                                ${course.level}
                            </span>
                        </div>
                        <div class="info-item mb-3">
                            <strong>Duration:</strong> ${course.duration}
                        </div>
                        <div class="info-item mb-3">
                            <strong>${course.type === 'quiz' ? 'Questions' : 'Lessons'}:</strong> ${course.lessons}
                        </div>
                        <div class="info-item mb-3">
                            <strong>Progress:</strong> ${Math.round((course.completed / course.lessons) * 100)}%
                            <div class="progress mt-1">
                                <div class="progress-bar" style="width: ${(course.completed / course.lessons) * 100}%"></div>
                            </div>
                        </div>
                        
                        <div class="d-grid gap-2 mt-4">
                            <button class="btn btn-primary" onclick="startCourse('${course.id}')">
                                ${course.completed > 0 ? 'Continue' : 'Start'} ${course.type === 'quiz' ? 'Quiz' : 'Course'}
                            </button>
                            <button class="btn btn-outline-secondary" onclick="addToFavorites('${course.id}')">
                                <i class="far fa-heart me-1"></i>Add to Favorites
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.show();
}

// Start course
function startCourse(courseId) {
    const course = findCourseById(courseId);
    if (!course) return;
    
    if (course.type === 'quiz') {
        startQuiz(courseId);
    } else {
        // Close course modal if open
        const courseModal = bootstrap.Modal.getInstance(document.getElementById('courseModal'));
        if (courseModal) courseModal.hide();
        
        alert(`Starting ${course.title}. This will open in the course player.`);
        // Here you would typically redirect to a course player page
        // For now, we'll simulate progress
        simulateCourseProgress(courseId);
    }
}

// Start quiz
function startQuiz(quizId) {
    const quiz = findCourseById(quizId);
    if (!quiz) return;
    
    // Close course modal if open
    const courseModal = bootstrap.Modal.getInstance(document.getElementById('courseModal'));
    if (courseModal) courseModal.hide();
    
    const modal = new bootstrap.Modal(document.getElementById('quizModal'));
    const title = document.getElementById('quizModalTitle');
    const body = document.getElementById('quizModalBody');
    const footer = document.getElementById('quizModalFooter');
    
    title.textContent = quiz.title;
    
    const questions = generateQuizQuestions(quiz.level, 5);
    let currentQuestion = 0;
    let userAnswers = [];
    
    function renderQuestion() {
        const question = questions[currentQuestion];
        
        body.innerHTML = `
            <div class="quiz-progress mb-4">
                <div class="d-flex justify-content-between mb-2">
                    <span>Question ${currentQuestion + 1} of ${questions.length}</span>
                    <span>${Math.round(((currentQuestion) / questions.length) * 100)}% Complete</span>
                </div>
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" style="width: ${((currentQuestion) / questions.length) * 100}%"></div>
                </div>
            </div>
            
            <div class="quiz-question">
                <div class="quiz-question-number">Question ${currentQuestion + 1}</div>
                <div class="quiz-question-text">${question.question}</div>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option" onclick="selectOption(${index})">
                            <input type="radio" name="answer" value="${index}" id="option${index}">
                            <label for="option${index}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        footer.innerHTML = `
            <button type="button" class="btn btn-secondary" ${currentQuestion === 0 ? 'disabled' : ''} onclick="previousQuestion()">
                Previous
            </button>
            <button type="button" class="btn btn-primary" onclick="${currentQuestion === questions.length - 1 ? 'finishQuiz()' : 'nextQuestion()'}">
                ${currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
        `;
    }
    
    window.selectOption = function(optionIndex) {
        userAnswers[currentQuestion] = optionIndex;
        
        // Update UI
        document.querySelectorAll('.quiz-option').forEach((option, index) => {
            option.classList.toggle('selected', index === optionIndex);
            option.querySelector('input').checked = index === optionIndex;
        });
    };
    
    window.nextQuestion = function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        }
    };
    
    window.previousQuestion = function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    };
    
    window.finishQuiz = function() {
        const score = calculateQuizScore(questions, userAnswers);
        showQuizResults(quiz, score, questions, userAnswers);
    };
    
    renderQuestion();
    modal.show();
}

// Calculate quiz score
function calculateQuizScore(questions, answers) {
    let correct = 0;
    questions.forEach((question, index) => {
        if (answers[index] === question.correct) {
            correct++;
        }
    });
    return Math.round((correct / questions.length) * 100);
}

// Show quiz results
function showQuizResults(quiz, score, questions, userAnswers) {
    const body = document.getElementById('quizModalBody');
    const footer = document.getElementById('quizModalFooter');
    
    // Save score
    userProgress.quizScores.push({ quizId: quiz.id, score: score, date: new Date().toISOString() });
    saveUserProgress();
    
    body.innerHTML = `
        <div class="quiz-score">
            <div class="quiz-score-value">${score}%</div>
            <div class="quiz-score-label">Your Score</div>
        </div>
        
        <div class="quiz-review">
            <h5>Review Your Answers</h5>
            ${questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correct;
                
                return `
                    <div class="quiz-question-review mb-4">
                        <div class="question-text fw-medium mb-2">${index + 1}. ${question.question}</div>
                        <div class="quiz-options">
                            ${question.options.map((option, optionIndex) => {
                                let classes = 'quiz-option ';
                                if (optionIndex === question.correct) classes += 'correct ';
                                if (optionIndex === userAnswer && !isCorrect) classes += 'incorrect ';
                                
                                return `
                                    <div class="${classes}">
                                        ${optionIndex === question.correct ? '<i class="fas fa-check me-2"></i>' : 
                                          optionIndex === userAnswer && !isCorrect ? '<i class="fas fa-times me-2"></i>' : ''}
                                        ${option}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    footer.innerHTML = `
        <button type="button" class="btn btn-secondary" onclick="retakeQuiz('${quiz.id}')">
            Retake Quiz
        </button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Continue Learning
        </button>
    `;
    
    updateSidebar();
}

// Generate quiz questions
function generateQuizQuestions(level, count) {
    const questionPools = {
        beginner: [
            {
                question: "In which year did the Liberation War of Bangladesh take place?",
                options: ["1970", "1971", "1972", "1973"],
                correct: 1
            },
            {
                question: "Who was the Father of the Nation of Bangladesh?",
                options: ["Ziaur Rahman", "Sheikh Mujibur Rahman", "Hussain Muhammad Ershad", "Khwaja Nazimuddin"],
                correct: 1
            },
            {
                question: "What was the duration of the Liberation War?",
                options: ["6 months", "9 months", "12 months", "15 months"],
                correct: 1
            },
            {
                question: "Which country supported Bangladesh during the Liberation War?",
                options: ["India", "Pakistan", "China", "USA"],
                correct: 0
            },
            {
                question: "What was the name of the freedom fighters' force?",
                options: ["Bangladesh Army", "Mukti Bahini", "Liberation Force", "Freedom Fighters"],
                correct: 1
            }
        ],
        intermediate: [
            {
                question: "Which operation was launched by Pakistan Army on March 25, 1971?",
                options: ["Operation Searchlight", "Operation Blitz", "Operation Clean-up", "Operation Grand Slam"],
                correct: 0
            },
            {
                question: "How many sectors was Bangladesh divided into during the war?",
                options: ["9", "11", "13", "15"],
                correct: 1
            },
            {
                question: "Who was the first sector commander of the Liberation War?",
                options: ["Major Ziaur Rahman", "Colonel M.A.G. Osmani", "Major Khaled Mosharraf", "Wing Commander Bashar"],
                correct: 1
            },
            {
                question: "Which international leader supported Bangladesh's independence?",
                options: ["Indira Gandhi", "Richard Nixon", "Leonid Brezhnev", "Zhou Enlai"],
                correct: 0
            },
            {
                question: "What was the Agartala Conspiracy Case about?",
                options: ["Economic conspiracy", "Political conspiracy for independence", "Military coup", "Foreign intervention"],
                correct: 1
            }
        ],
        advanced: [
            {
                question: "What was the strategic significance of the Battle of Jessore?",
                options: ["First major victory", "Liberated first district", "International recognition", "All of the above"],
                correct: 3
            },
            {
                question: "Which factor was most crucial for Bangladesh's victory?",
                options: ["International support", "Guerrilla warfare", "Popular support", "All factors combined"],
                correct: 3
            },
            {
                question: "What was the impact of the Liberation War on regional geopolitics?",
                options: ["Changed South Asian dynamics", "Affected Cold War relations", "Influenced UN policies", "All of the above"],
                correct: 3
            },
            {
                question: "How did the Liberation War influence Bangladesh's constitution?",
                options: ["Established secularism", "Ensured democracy", "Protected minority rights", "All principles included"],
                correct: 3
            },
            {
                question: "What lessons can be learned from the Liberation War?",
                options: ["Importance of unity", "Power of determination", "Value of sacrifice", "All lessons are valid"],
                correct: 3
            }
        ]
    };
    
    const pool = questionPools[level] || questionPools.beginner;
    const shuffled = pool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, pool.length));
}

// Find course by ID
function findCourseById(courseId) {
    for (const type of Object.keys(courses)) {
        const found = courses[type].find(course => course.id === courseId);
        if (found) return found;
    }
    return null;
}

// Generate learning objectives
function generateLearningObjectives(type) {
    const objectives = {
        interactive: [
            'Navigate through interactive timelines and simulations',
            'Analyze historical events through multimedia content',
            'Understand cause and effect relationships',
            'Develop critical thinking skills'
        ],
        video: [
            'Learn from expert historians and veterans',
            'Visualize historical events and locations',
            'Understand different perspectives on the war',
            'Gain emotional connection to the history'
        ],
        reading: [
            'Analyze primary and secondary sources',
            'Develop reading comprehension skills',
            'Understand historical context and significance',
            'Build vocabulary and knowledge base'
        ],
        quiz: [
            'Test and reinforce your knowledge',
            'Identify areas for improvement',
            'Track your learning progress',
            'Prepare for advanced studies'
        ]
    };
    
    return objectives[type] || objectives.interactive;
}

// Generate course structure
function generateCourseStructure(course) {
    const structures = {
        interactive: [
            'Introduction and Overview',
            'Historical Context',
            'Interactive Timeline',
            'Key Events Analysis',
            'Character Profiles',
            'Cause and Effect',
            'Assessment Activity',
            'Conclusion and Review'
        ],
        video: [
            'Course Introduction',
            'Historical Background',
            'Expert Interviews',
            'Documentary Segments',
            'Veteran Testimonials',
            'Analysis and Discussion',
            'Q&A Session',
            'Final Thoughts'
        ],
        reading: [
            'Reading Overview',
            'Primary Sources',
            'Historical Documents',
            'Memoirs and Accounts',
            'Scholarly Articles',
            'Literary Works',
            'Critical Analysis',
            'Reflection Essay'
        ],
        quiz: [
            'Basic Facts',
            'Key Figures',
            'Timeline Events',
            'Battles and Strategy',
            'Political Context',
            'Social Impact',
            'International Relations',
            'Final Assessment'
        ]
    };
    
    const structure = structures[course.type] || structures.interactive;
    return structure.slice(0, course.lessons).map((title, index) => ({
        title: title,
        duration: course.type === 'quiz' ? '2-3 min' : Math.floor(Math.random() * 20 + 10) + ' min'
    }));
}

// Setup filters
function setupFilters() {
    document.getElementById('levelFilter').addEventListener('change', (e) => {
        filterCoursesByLevel(e.target.value);
    });
}

// Filter courses by level
function filterCoursesByLevel(level) {
    Object.keys(courses).forEach(type => {
        const filtered = level === 'all' ? courses[type] : courses[type].filter(course => course.level === level);
        renderCourseType(type, filtered);
    });
}

// Setup tabs
function setupTabs() {
    // Bootstrap handles tab switching automatically
    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', (e) => {
            // Optional: Track tab views or perform actions when tabs are switched
        });
    });
}

// Render sidebar
function renderSidebar() {
    updateProgressTracker();
    renderRecommendedCourses();
    renderRecentActivity();
}

// Update sidebar
function updateSidebar() {
    renderSidebar();
}

// Update progress tracker
function updateProgressTracker() {
    const totalLessons = Object.values(courses).flat().reduce((sum, course) => sum + course.lessons, 0);
    const completedLessons = userProgress.completedLessons.length;
    const averageScore = userProgress.quizScores.length > 0 ? 
        userProgress.quizScores.reduce((sum, score) => sum + score.score, 0) / userProgress.quizScores.length : 0;
    
    document.getElementById('completedLessons').textContent = `${completedLessons}/${totalLessons}`;
    document.getElementById('lessonsProgress').style.width = `${(completedLessons / totalLessons) * 100}%`;
    document.getElementById('averageScore').textContent = `${Math.round(averageScore)}%`;
    document.getElementById('scoresProgress').style.width = `${averageScore}%`;
}

// Render recommended courses
function renderRecommendedCourses() {
    const container = document.getElementById('recommendedCourses');
    const allCourses = Object.values(courses).flat();
    const recommended = allCourses.filter(course => course.completed === 0).slice(0, 4);
    
    container.innerHTML = recommended.map(course => `
        <div class="recommended-item" onclick="openCourse('${course.id}')">
            <div class="recommended-thumbnail">
                <img src="${course.thumbnail}" alt="${course.title}">
            </div>
            <div class="recommended-info">
                <div class="recommended-title">${course.title}</div>
                <div class="recommended-meta">${course.level} • ${course.duration}</div>
            </div>
        </div>
    `).join('');
}

// Render recent activity
function renderRecentActivity() {
    const container = document.getElementById('recentActivity');
    const activities = generateRecentActivities();
    
    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// Generate recent activities
function generateRecentActivities() {
    return [
        {
            type: 'completed',
            icon: 'check-circle',
            title: 'Completed Liberation War Basics',
            time: '2 hours ago'
        },
        {
            type: 'started',
            icon: 'play-circle',
            title: 'Started Video Documentary Series',
            time: '1 day ago'
        },
        {
            type: 'quiz',
            icon: 'question-circle',
            title: 'Scored 85% in Timeline Quiz',
            time: '3 days ago'
        },
        {
            type: 'completed',
            icon: 'book-open',
            title: 'Finished Reading Primary Sources',
            time: '1 week ago'
        }
    ];
}

// Update education stats
function updateEducationStats() {
    const totalLessons = Object.values(courses).flat().reduce((sum, course) => sum + course.lessons, 0);
    const totalResources = Object.values(courses).flat().length;
    const totalStudents = Math.floor(Math.random() * 5000 + 10000);
    
    document.getElementById('lessonsCount').textContent = totalLessons;
    document.getElementById('resourcesCount').textContent = totalResources;
    document.getElementById('studentsCount').textContent = totalStudents.toLocaleString();
}

// Load user progress
function loadUserProgress() {
    const saved = localStorage.getItem('educationProgress');
    if (saved) {
        userProgress = { ...userProgress, ...JSON.parse(saved) };
    }
    updateProgressTracker();
}

// Save user progress
function saveUserProgress() {
    localStorage.setItem('educationProgress', JSON.stringify(userProgress));
}

// Simulate course progress
function simulateCourseProgress(courseId) {
    const course = findCourseById(courseId);
    if (!course) return;
    
    // Simulate some progress
    course.completed = Math.min(course.completed + Math.floor(Math.random() * 3 + 1), course.lessons);
    
    // Add to completed lessons
    const lessonId = `${courseId}-${course.completed}`;
    if (!userProgress.completedLessons.includes(lessonId)) {
        userProgress.completedLessons.push(lessonId);
    }
    
    saveUserProgress();
    renderCourses();
    updateSidebar();
}

// Study tool functions
function showStudyGuide() {
    showStudyTool('Study Guide', `
        <div class="study-guide">
            <h5>Liberation War Study Guide</h5>
            <div class="guide-section">
                <h6>Key Topics to Focus On:</h6>
                <ul>
                    <li>Background and causes of the Liberation War</li>
                    <li>Timeline of major events in 1971</li>
                    <li>Key figures and their contributions</li>
                    <li>Military strategy and tactics</li>
                    <li>International involvement and support</li>
                    <li>Social and cultural impact</li>
                </ul>
            </div>
            <div class="guide-section">
                <h6>Study Tips:</h6>
                <ul>
                    <li>Create timeline charts for better memorization</li>
                    <li>Make character profiles of important figures</li>
                    <li>Practice with maps to understand geography</li>
                    <li>Take regular quizzes to test knowledge</li>
                    <li>Discuss with peers for different perspectives</li>
                </ul>
            </div>
        </div>
    `);
}

function showTimeline() {
    showStudyTool('Timeline Tool', `
        <div class="timeline-tool">
            <h5>Interactive Timeline Tool</h5>
            <p>Create and customize your own timeline of Liberation War events.</p>
            <div class="timeline-placeholder p-4 bg-light rounded text-center">
                <i class="fas fa-history fa-3x text-muted mb-3"></i>
                <p>Timeline tool will load here. This feature allows you to:</p>
                <ul class="list-unstyled">
                    <li>• Add custom events and dates</li>
                    <li>• Filter events by category</li>
                    <li>• Export timeline as PDF</li>
                    <li>• Share with study groups</li>
                </ul>
            </div>
        </div>
    `);
}

function showGlossary() {
    showStudyTool('Glossary', `
        <div class="glossary">
            <h5>Liberation War Glossary</h5>
            <div class="glossary-search mb-3">
                <input type="text" class="form-control" placeholder="Search terms..." onkeyup="filterGlossary(this.value)">
            </div>
            <div class="glossary-terms" id="glossaryTerms">
                <div class="term-item">
                    <strong>Mukti Bahini:</strong> The liberation army of Bangladesh during the 1971 Liberation War.
                </div>
                <div class="term-item">
                    <strong>Operation Searchlight:</strong> Military operation launched by Pakistan Army on March 25, 1971.
                </div>
                <div class="term-item">
                    <strong>Sector Commanders:</strong> Military leaders who commanded different sectors during the war.
                </div>
                <div class="term-item">
                    <strong>Agartala Conspiracy:</strong> A case filed against Sheikh Mujibur Rahman and others.
                </div>
                <div class="term-item">
                    <strong>Six Point Movement:</strong> Political movement led by Sheikh Mujibur Rahman for autonomy.
                </div>
            </div>
        </div>
    `);
}

function showCertificates() {
    showStudyTool('Certificates', `
        <div class="certificates">
            <h5>Your Certificates</h5>
            <div class="certificate-list">
                <div class="certificate-item p-3 border rounded mb-3">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-certificate fa-2x text-warning me-3"></i>
                        <div>
                            <h6 class="mb-1">Liberation War Basics</h6>
                            <small class="text-muted">Completed: March 15, 2024</small>
                        </div>
                        <button class="btn btn-outline-primary btn-sm ms-auto">Download</button>
                    </div>
                </div>
                <div class="text-center p-4 bg-light rounded">
                    <p class="text-muted">Complete more courses to earn certificates!</p>
                </div>
            </div>
        </div>
    `);
}

function showStudyTool(title, content) {
    const modal = new bootstrap.Modal(document.getElementById('studyToolModal'));
    document.getElementById('studyToolModalTitle').textContent = title;
    document.getElementById('studyToolModalBody').innerHTML = content;
    modal.show();
}

// Utility functions
function previewCourse(courseId) {
    alert('Course preview will be available soon!');
}

function addToFavorites(courseId) {
    alert('Course added to favorites!');
}

function retakeQuiz(quizId) {
    bootstrap.Modal.getInstance(document.getElementById('quizModal')).hide();
    setTimeout(() => startQuiz(quizId), 300);
}

function filterGlossary(searchTerm) {
    const terms = document.querySelectorAll('.term-item');
    terms.forEach(term => {
        const text = term.textContent.toLowerCase();
        term.style.display = text.includes(searchTerm.toLowerCase()) ? 'block' : 'none';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for core to be loaded
    if (typeof initializeCore === 'function') {
        initializeCore();
    }
    initializeEducation();
});

// Make functions available globally
window.selectLearningPath = selectLearningPath;
window.openCourse = openCourse;
window.startCourse = startCourse;
window.previewCourse = previewCourse;
window.addToFavorites = addToFavorites;
window.showStudyGuide = showStudyGuide;
window.showTimeline = showTimeline;
window.showGlossary = showGlossary;
window.showCertificates = showCertificates;
window.retakeQuiz = retakeQuiz;
window.filterGlossary = filterGlossary;
