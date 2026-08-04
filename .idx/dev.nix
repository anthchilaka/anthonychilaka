# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  channel = "stable-24.11";
  packages = [
    pkgs.nodejs_22
    pkgs.nodePackages.firebase-tools
  ];
  env = {};
  idx = {
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
    ];
    workspace = {
      onCreate = {
        npm-install = "npm i --no-audit --no-progress --timing";
        default.openFiles = [ "src/App.tsx" "src/App.ts" "src/App.jsx" "src/App.js" ];
      };
      onStart = {
        install-claude = "npm install -g @anthropic-ai/claude-code";
      };
    };
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
