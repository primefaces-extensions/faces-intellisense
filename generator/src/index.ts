import * as fromvdl from "./util/from-vdl";
import * as fromxml from "./util/from-xml";

// All taglibs (with different versions) from XML file
const tagLibsFromXml = [
  {
    folder: "primefaces-extensions",
    fileName: "primefaces-extensions",
    versions: [
      {
        version: "10.0.0",
        url: "https://raw.githubusercontent.com/primefaces-extensions/primefaces-extensions/10.0.0/core/src/main/resources/META-INF/primefaces-extensions.taglib.xml",
      },
      {
        version: "11.0.0",
        url: "https://raw.githubusercontent.com/primefaces-extensions/primefaces-extensions/11.0.0/core/src/main/resources/META-INF/primefaces-extensions.taglib.xml",
      },
      {
        version: "12.0.0",
        url: "https://raw.githubusercontent.com/primefaces-extensions/primefaces-extensions/12.0.11/core/src/main/resources/META-INF/primefaces-extensions.taglib.xml",
      },
      {
        version: "13.0.0",
        url: "https://raw.githubusercontent.com/primefaces-extensions/primefaces-extensions/13.0.5/core/src/main/resources/META-INF/primefaces-extensions.taglib.xml",
      },
      {
        version: "14.0.0",
        url: "https://raw.githubusercontent.com/primefaces-extensions/primefaces-extensions/master/core/src/main/resources/META-INF/primefaces-extensions.taglib.xml",
      },
    ],
  },
  {
    folder: "primefaces",
    fileName: "primefaces",
    versions: [
      {
        version: "8.0.0",
        url: "https://raw.githubusercontent.com/primefaces/primefaces/8.0/src/main/resources/META-INF/primefaces-p.taglib.xml",
      },
      {
        version: "10.0.0",
        url: "https://raw.githubusercontent.com/primefaces/primefaces/10.0.0/src/main/resources/META-INF/primefaces-p.taglib.xml",
      },
      {
        version: "11.0.0",
        url: "https://raw.githubusercontent.com/primefaces/primefaces/11.0.0/primefaces/src/main/resources/META-INF/primefaces-p.taglib.xml",
      },
      {
        version: "12.0.0",
        url: "https://raw.githubusercontent.com/primefaces/primefaces/12.0.0/primefaces/src/main/resources/META-INF/primefaces-p.taglib.xml",
      },
      {
        version: "13.0.0",
        url: "https://raw.githubusercontent.com/primefaces/primefaces/13.0.5/primefaces/src/main/resources/META-INF/primefaces-p.taglib.xml",
      },
      {
        version: "14.0.0",
        url: "https://raw.githubusercontent.com/primefaces/primefaces/master/primefaces/src/main/resources/META-INF/primefaces-p.taglib.xml",
      },
    ],
  },
  {
    folder: "omnifaces",
    fileName: "omnifaces",
    versions: [
      {
        version: "3.0",
        url: "https://raw.githubusercontent.com/omnifaces/omnifaces/3.0/src/main/resources/META-INF/omnifaces-ui.taglib.xml",
      },
      {
        version: "4.0",
        url: "https://raw.githubusercontent.com/omnifaces/omnifaces/4.0/src/main/resources/META-INF/omnifaces-ui.taglib.xml",
      },
    ],
  },
  {
    folder: "jakarta",
    fileName: "c",
    versions: [
      {
        version: "4.0",
        url: "https://raw.githubusercontent.com/eclipse-ee4j/mojarra/4.0/impl/src/main/resources/com/sun/faces/metadata/taglib/tags.core.taglib.xml",
      },
      {
        version: "5.0",
        url: "https://raw.githubusercontent.com/eclipse-ee4j/mojarra/master/impl/src/main/resources/com/sun/faces/metadata/taglib/tags.core.taglib.xml",
      },
    ],
  },
  {
    folder: "jakarta",
    fileName: "f",
    versions: [
      {
        version: "4.0",
        url: "https://raw.githubusercontent.com/eclipse-ee4j/mojarra/4.0/impl/src/main/resources/com/sun/faces/metadata/taglib/faces.core.taglib.xml",
      },
      {
        version: "5.0",
        url: "https://raw.githubusercontent.com/eclipse-ee4j/mojarra/master/impl/src/main/resources/com/sun/faces/metadata/taglib/faces.core.taglib.xml",
      },
    ],
  },
  {
    folder: "jakarta",
    fileName: "ui",
    versions: [
      {
        version: "4.0",
        url: "https://raw.githubusercontent.com/eclipse-ee4j/mojarra/4.0/impl/src/main/resources/com/sun/faces/metadata/taglib/faces.facelets.taglib.xml",
      },
      {
        version: "5.0",
        url: "https://raw.githubusercontent.com/eclipse-ee4j/mojarra/master/impl/src/main/resources/com/sun/faces/metadata/taglib/faces.facelets.taglib.xml",
      },
    ],
  },
  {
    folder: "jakarta",
    fileName: "cc",
    versions: [
      {
        version: "4.0",
        url: "https://raw.githubusercontent.com/eclipse-ee4j/mojarra/4.0/impl/src/main/resources/com/sun/faces/metadata/taglib/faces.composite.taglib.xml",
      },
      {
        version: "5.0",
        url: "https://raw.githubusercontent.com/eclipse-ee4j/mojarra/master/impl/src/main/resources/com/sun/faces/metadata/taglib/faces.composite.taglib.xml",
      },
    ],
  },
  {
    folder: "jakarta",
    fileName: "h",
    versions: [
      {
        version: "4.0",
        url: "https://raw.githubusercontent.com/eclipse-ee4j/mojarra/4.0/impl/src/main/resources/com/sun/faces/metadata/taglib/faces.html.taglib.xml",
      },
      {
        version: "5.0",
        url: "https://raw.githubusercontent.com/eclipse-ee4j/mojarra/master/impl/src/main/resources/com/sun/faces/metadata/taglib/faces.html.taglib.xml",
      },
    ],
  },
];

const createFromXml = () => {
  tagLibsFromXml.forEach((tab) => {
    const folder = tab.folder;
    const fileName = tab.fileName;
    tab.versions.forEach((ver) => {
      const version = ver.version;
      const url = ver.url;
      fromxml.execute(folder, fileName, version, url);
    });
  });
};

createFromXml();
