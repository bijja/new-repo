freeStyleJob('example') {
    logRotator(-1, 10)
    jdk('JAVA_HOME')
    scm {
        github('https://github.com/bijja/new-repo.git', 'master')
    }
    triggers {
        scm ('H/5 * * * *')
    }
    steps {
       maven('clean verify')
    }
    publishers {
        archiveArtifacts('target/*.war')
    }
}