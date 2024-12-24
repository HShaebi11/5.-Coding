class FigmaToCSS {
    constructor(figmaApiKey) {
      this.apiKey = figmaApiKey;
      this.baseUrl = 'https://api.figma.com/v1';
    }
  
    async getFileStyles(fileId) {
      try {
        const response = await fetch(`${this.baseUrl}/files/${fileId}/styles`, {
          headers: {
            'X-Figma-Token': this.apiKey
          }
        });
        return await response.json();
      } catch (error) {
        console.error('Error fetching Figma styles:', error);
        throw error;
      }
    }
  
    convertToCSSRules(figmaStyles) {
      let cssOutput = '';
  
      figmaStyles.meta.styles.forEach(style => {
        const cssRule = this.processStyle(style);
        if (cssRule) {
          cssOutput += cssRule + '\n\n';
        }
      });
  
      return cssOutput;
    }
  
    processStyle(style) {
      switch (style.styleType) {
        case 'FILL':
          return this.processFillStyle(style);
        case 'TEXT':
          return this.processTextStyle(style);
        case 'EFFECT':
          return this.processEffectStyle(style);
        default:
          return null;
      }
    }
  
    processFillStyle(style) {
      const className = `.${this.generateClassName(style.name)}`;
      const color = style.description || '#000000';
      return `${className} {
    background-color: ${color};
  }`;
    }
  
    processTextStyle(style) {
      const className = `.${this.generateClassName(style.name)}`;
      return `${className} {
    font-family: ${style.description || 'inherit'};
    font-size: ${style.fontSize || 16}px;
    font-weight: ${style.fontWeight || 400};
  }`;
    }
  
    processEffectStyle(style) {
      const className = `.${this.generateClassName(style.name)}`;
      return `${className} {
    box-shadow: ${style.description || 'none'};
  }`;
    }
  
    generateClassName(styleName) {
      return styleName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }
  
    extractFileId(figmaUrl) {
      try {
        const url = new URL(figmaUrl);
        const pathParts = url.pathname.split('/');
        const fileId = pathParts[pathParts.indexOf('file') + 1];
        if (!fileId) throw new Error('Invalid Figma URL');
        return fileId;
      } catch (error) {
        throw new Error('Please enter a valid Figma file URL');
      }
    }
  
    async generateCSS(figmaUrl) {
      const fileId = this.extractFileId(figmaUrl);
      const styles = await this.getFileStyles(fileId);
      return this.convertToCSSRules(styles);
    }
  }