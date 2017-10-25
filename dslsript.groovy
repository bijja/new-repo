folder('hpsim-jobs') {
    displayName('hpsim-jobs')
    description('Folder for hpsim-jobs')
}
freeStyleJob('hpsim-jobs/freestyle-job') {
    logRotator(-1, 10)
    jdk('JAVA_HOME')
    scm {
        github('bijja/new-repo', 'master')
    }
    triggers {
        scm ('H/5 * * * *')
    }
    steps {
       maven('clean verify install package test')
    }
    publishers {
        archiveArtifacts('target/*.war')
    }
    
}
