folder('hpsim-jobs') {
    displayName('hpsim-jobs')
    description('Folder for hpsim-jobs')
}
freeStyleJob('hpsim-jobs/freestyle-job') {
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
