param (
    [string]$Command,
    [string]$WorkingDir = "C:\Users\larsd\Documents\Codex\2026-09-08\files-pasted-by-the-user-entwicklungsauftrag"
)

try {
    Set-Location $WorkingDir
    $Output = Invoke-Expression $Command 2>&1 | Out-String
    $Result = @{ result = @{ stdout = $Output } }
    Write-Output (ConvertTo-Json $Result -Compress)
} catch {
    $ErrorResult = @{ error = $_.Exception.Message }
    Write-Output (ConvertTo-Json $ErrorResult -Compress)
}
