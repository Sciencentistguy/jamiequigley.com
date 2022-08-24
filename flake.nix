{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = inputs @ {
    self,
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      # devShells.default = pkgs.mkShell {
      # name = "jamiequigley.com";
      # buildInputs = with pkgs; [hugo];
      # };

      packages.default = pkgs.stdenv.mkDerivation {
        name = "jamiequigley.com";

        src = pkgs.lib.cleanSource ./.;

        nativeBuildInputs = with pkgs; [hugo];

        buildPhase = ''
          hugo
        '';

        installPhase = ''
          mkdir -p $out
          cp -a public/* $out/
        '';
      };
    });
}
