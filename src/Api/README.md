

## dotnet core

https://github.com/dotnet/cli

https://github.com/dotnet/sdk

## install latest
1.0.0-preview5

https://github.com/dotnet/cli#download-links

## How to run
```
dotnet restore
dotnet run
```
## How to publish

```
dotnet publish -r win10-x64
dotnet publish -r osx.10.11-x64
dotnet publish -r ubuntu.14.04-x64
```


## Target fix preview 5

C:\Program Files\dotnet\sdk\1.0.0-preview5-004478\Sdks\Microsoft.NET.Sdk\build\Microsoft.NET.Publish.targets

###  replace target 
```
<Target Name="_CopyResolvedFilesToPublishPreserveNewest"
          DependsOnTargets="_ComputeResolvedFilesToPublishTypes"
          Inputs="@(_ResolvedFileToPublishPreserveNewest)"
          Outputs="@(_ResolvedFileToPublishPreserveNewest->'$(PublishDir)%(RelativePath)')">

    <!--
        Not using SkipUnchangedFiles="true" because the application may want to change
        one of these files and not have an incremental build replace it.
        -->
    <Copy SourceFiles = "@(_ResolvedFileToPublishPreserveNewest)"
            DestinationFiles="@(_ResolvedFileToPublishPreserveNewest->'$(PublishDir)%(RelativePath)')"
            OverwriteReadOnlyFiles="$(OverwriteReadOnlyFiles)"
            Retries="$(CopyRetryCount)"
            RetryDelayMilliseconds="$(CopyRetryDelayMilliseconds)"
            UseHardlinksIfPossible="$(CreateHardLinksForPublishFilesIfPossible)"
            UseSymboliclinksIfPossible="$(CreateSymbolicLinksForPublishFilesIfPossible)">

        <Output TaskParameter="DestinationFiles" ItemName="FileWrites"/>

    </Copy>
</Target>
  ```