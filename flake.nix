{
  description = "A Nix-flake-based TypeScipt development environment";

  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1"; # unstable Nixpkgs
  };

  outputs =
    { self, nixpkgs, ... }@inputs:

    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];

      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

      nixpkgsFor = forAllSystems (system: import nixpkgs { inherit system; });
    in
    {
      devShells = forAllSystems (system: {
        default = let pkgs = nixpkgsFor.${system}; in pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_25
            typescript
            imagemagick

            docker
            docker-compose
          ];
        };
      });
    };
}