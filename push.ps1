# Git push script
$ErrorActionPreference = "Stop"

try {
    # Check if git is available
    if (!(Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Error "Git is still not found in the PATH. Please ensure it is installed and the terminal is restarted."
        exit 1
    }

    # Initialize if not already
    if (!(Test-Path .git)) {
        git init
        Write-Host "Initialized empty Git repository."
    }

    # Add remote
    git remote remove origin 2>$null
    git remote add origin https://github.com/thedhruv-07/FinTrack
    Write-Host "Set remote origin."

    # Add and commit
    git add .
    git commit -m "Fix toggles, add mobile responsiveness, and enhance UI interactivity"
    Write-Host "Committed changes."

    # Push
    git branch -M main
    git push -u origin main
    Write-Host "Successfully pushed to GitHub."
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
