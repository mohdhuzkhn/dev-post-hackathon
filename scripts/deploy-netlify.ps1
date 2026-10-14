$ErrorActionPreference = 'Stop'
$deployRoot = Split-Path -Parent $PSScriptRoot
$deployTavilyKey = $env:TAVILY_API_KEY
if (-not $deployTavilyKey) {
  $deployEnvFile = Join-Path $deployRoot '.env.local'
  if (Test-Path -LiteralPath $deployEnvFile) {
    $deployKeyLine = Get-Content -LiteralPath $deployEnvFile | Where-Object { $_ -match '^TAVILY_API_KEY=' } | Select-Object -First 1
    if ($deployKeyLine) { $deployTavilyKey = ($deployKeyLine -split '=',2)[1].Trim().Trim('"').Trim("'") }
  }
}
if (-not $deployTavilyKey) { throw 'Configure TAVILY_API_KEY before deployment. Never paste credentials into chat.' }
Push-Location -LiteralPath $deployRoot
try {
  # Masked deploy-level override; only deployed functions receive this key.
  & npx --yes --package=netlify-cli netlify deploy --prod --context production --secret-env "TAVILY_API_KEY=$deployTavilyKey"
  if ($LASTEXITCODE -ne 0) { throw 'Netlify deployment failed.' }
} finally { Pop-Location }
